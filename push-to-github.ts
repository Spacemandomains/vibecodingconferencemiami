import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;
  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

const IGNORE_PATTERNS = [
  'node_modules', '.git', '.cache', '.config', '.local', 
  'dist', '.replit', 'replit.nix', '.upm', '.pythonlibs',
  'generated-icon.png', '.breakpoints', '__pycache__',
  'package-lock.json'
];

function shouldIgnore(filePath: string): boolean {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function getAllFiles(dirPath: string, basePath: string = dirPath): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(basePath, fullPath);
    
    if (shouldIgnore(relativePath)) continue;
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, basePath));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }
  return files;
}

async function main() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const owner = 'Spacemandomains';
  const repo = 'vibecodingconferencemiami';
  
  const projectDir = '/home/runner/workspace';
  const files = getAllFiles(projectDir);
  
  console.log(`Found ${files.length} files to push`);
  
  // Get the default branch
  let defaultBranch = 'main';
  let baseSha: string | undefined;
  
  try {
    const repoInfo = await octokit.repos.get({ owner, repo });
    defaultBranch = repoInfo.data.default_branch;
    
    const ref = await octokit.git.getRef({ owner, repo, ref: `heads/${defaultBranch}` });
    baseSha = ref.data.object.sha;
    console.log(`Existing repo found, branch: ${defaultBranch}`);
  } catch (e: any) {
    if (e.status === 404) {
      console.log('Repository not found or empty, will initialize');
    } else {
      throw e;
    }
  }
  
  // Create blobs for all files
  const treeItems: any[] = [];
  
  for (const file of files) {
    const fullPath = path.join(projectDir, file);
    const content = fs.readFileSync(fullPath);
    
    // Check if binary
    const isBinary = content.some((byte: number) => byte === 0);
    
    let blob;
    if (isBinary) {
      blob = await octokit.git.createBlob({
        owner, repo,
        content: content.toString('base64'),
        encoding: 'base64'
      });
    } else {
      blob = await octokit.git.createBlob({
        owner, repo,
        content: content.toString('utf-8'),
        encoding: 'utf-8'
      });
    }
    
    treeItems.push({
      path: file,
      mode: '100644' as const,
      type: 'blob' as const,
      sha: blob.data.sha
    });
    
    process.stdout.write('.');
  }
  
  console.log('\nCreating tree...');
  
  const tree = await octokit.git.createTree({
    owner, repo,
    tree: treeItems,
    ...(baseSha ? { base_tree: baseSha } : {})
  });
  
  console.log('Creating commit...');
  
  const commit = await octokit.git.createCommit({
    owner, repo,
    message: 'Update Vibe Coding Conference site from Replit',
    tree: tree.data.sha,
    ...(baseSha ? { parents: [baseSha] } : { parents: [] })
  });
  
  console.log('Updating branch reference...');
  
  try {
    await octokit.git.updateRef({
      owner, repo,
      ref: `heads/${defaultBranch}`,
      sha: commit.data.sha
    });
  } catch {
    await octokit.git.createRef({
      owner, repo,
      ref: `refs/heads/${defaultBranch}`,
      sha: commit.data.sha
    });
  }
  
  console.log(`Successfully pushed to https://github.com/${owner}/${repo}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
