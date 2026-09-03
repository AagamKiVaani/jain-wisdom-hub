// ============================================================================
// GIT BRANCH & LIFECYCLE MANAGER
// Isolates autonomous elevations into clean git branches.
// ============================================================================

import { execSync } from "child_process";

export function createElevationBranch(featureSlug: string, cwd: string): string {
  const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
  const branchName = `elevation/${featureSlug}-${timestamp}`;

  // Make sure working directory is clean or checkout new branch
  execSync(`git checkout -b ${branchName}`, { cwd, stdio: "pipe" });
  return branchName;
}

export function commitElevation(branchName: string, message: string, cwd: string): void {
  execSync("git add .", { cwd, stdio: "pipe" });
  execSync(`git commit -m "${message}"`, { cwd, stdio: "pipe" });
}

export function mergeBranchToMain(branchName: string, cwd: string): void {
  execSync("git checkout main", { cwd, stdio: "pipe" });
  execSync(`git merge ${branchName} --no-ff -m "Merge autonomous elevation: ${branchName}"`, { cwd, stdio: "pipe" });
  execSync(`git push origin main`, { cwd, stdio: "pipe" });
}

export function discardBranch(branchName: string, cwd: string): void {
  execSync("git checkout main", { cwd, stdio: "pipe" });
  execSync(`git branch -D ${branchName}`, { cwd, stdio: "pipe" });
}
