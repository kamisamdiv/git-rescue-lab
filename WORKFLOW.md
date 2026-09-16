Git Rescue Lab - Workflow & Incident Report



1. Bug Identification (Task 1)

Bad Commit Hash: `c99fb4209e6fb6e5ed2789893fdb2f893d61d6c6`

Explanation: Using `git bisect`, the commit made by `asdf` was identified as the regression point. It broke the `BULK20` discount logic in `pricing.js` by miscalculating bulk order thresholds.


2. Branching Strategy Justification

Using feature branches (such as `feature/holiday-sale`) isolates new functionality from the stable `main` branch. This allows independent development, code reviews, and testing before code is merged. Resolving conflicts on feature branches ensures the production code on `main` remains functional and stable at all times.


3. Secret History Removal

Why `git rm` is insufficient: Running `git rm` only deletes a file from the latest commit, but the secret file and its plain-text keys remain stored permanently inside earlier Git commit objects. Anyone with repository access can look through `git log` or checkout old commits to retrieve the secret.

How Interactive Rebase Removes It: Interactive rebase (`git rebase -i`) allows us to completely `drop` the commit containing the sensitive data. This rewrites the commit chain so that the secret never existed in the repository tree.



4. History Rewriting & Best Practices

Risks of Rewriting Shared History: Rewriting history (using `git rebase`, `commit --amend`, or `git push --force`) changes commit hashes. If other team members have already pulled those commits, their local branches will diverge from the remote, causing severe sync conflicts and potential work loss.

Best Practices: Never force push to shared default branches (like `main`) without team coordination. Apply history rewrites strictly on isolated feature branches prior to merging, or use protected branch rules in production repositories.

