+++
title = "Using a personal access token (PAT) with a GitHub repository"
date = "2025-03-03"
template = "page.html"
description = ""

[taxonomies]
tags = [ "tools", "git", "github"]
+++ 

## Steps to setup and use.

To push code to a GitHub repository using a personal access token (PAT) from a Linux system, follow these steps:

---

### 1. **Generate a Personal Access Token (PAT)**
   - Go to your GitHub account settings.
   - Navigate to **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
   - Click **Generate new token** (classic).
   - Select the necessary permissions (e.g., `repo` for full control of private repositories).
   - Generate the token and copy it (you won’t be able to see it again after closing the page).

---

### 2. **Clone the Repository (if not already cloned)**
   If you haven't cloned the repository yet, use the following command:

   ```bash
   git clone https://github.com/username/repository.git
   ```

   Replace `username` with your GitHub username and `repository` with the repository name.

---

### 3. **Configure Git to Use the Personal Access Token**
   Instead of using your GitHub password, you'll use the PAT for authentication.

   - Navigate to the repository directory:

     ```bash
     cd repository
     ```

   - Update the remote URL to include the PAT:

     ```bash
     git remote set-url origin https://<TOKEN>@github.com/username/repository.git
     ```

     Replace `<TOKEN>` with your personal access token, and `username/repository` with your GitHub username and repository name.

     Example:

     ```bash
     git remote set-url origin https://ghp_1234567890abcdef1234567890abcdef1234@github.com/username/repository.git
     ```

---

### 4. **Add, Commit, and Push Your Changes**
   - Stage your changes:

     ```bash
     git add .
     ```

   - Commit your changes:

     ```bash
     git commit -m "Your commit message"
     ```

   - Push your changes to the repository:

     ```bash
     git push origin main
     ```

     Replace `main` with the branch name if it's different.

---

### 5. **Optional: Store the Token Securely**
   If you don't want to include the token in the remote URL, you can use a credential helper to store it securely:

   - Install the Git credential helper:

     ```bash
     sudo apt-get install git-credential-manager
     ```

   - Store the token:

     ```bash
     git config --global credential.helper store
     ```

   - Push your changes, and Git will prompt you for your username and password. Use your GitHub username and the PAT as the password.

---

### Notes:
- Always keep your PAT secure and avoid sharing it.
- If you encounter issues, ensure the token has the correct permissions and is not expired.



## Trouble Shooting

If you're still encountering an authentication error when trying to push code to GitHub using a personal access token (PAT), let's troubleshoot step by step. Here are some common issues and solutions:

---

### 1. **Verify the Personal Access Token (PAT)**
   - Ensure the PAT is correctly generated with the necessary permissions (e.g., `repo` for full control of private repositories).
   - Check if the token has expired. If it has, generate a new one.
   - Make sure you're using the correct token format. It should look something like this: `ghp_1234567890abcdef1234567890abcdef1234`.

---

### 2. **Check the Remote URL**
   Ensure the remote URL is correctly set to include the PAT. Run the following command to check the current remote URL:

   ```bash
   git remote -v
   ```

   The output should look like this:

   ```
   origin  https://<TOKEN>@github.com/username/repository.git (fetch)
   origin  https://<TOKEN>@github.com/username/repository.git (push)
   ```

   If it doesn't, update the remote URL as follows:

   ```bash
   git remote set-url origin https://<TOKEN>@github.com/username/repository.git
   ```

   Replace `<TOKEN>` with your PAT and `username/repository` with your GitHub username and repository name.

---

### 3. **Use the Correct GitHub Username**
   When prompted for a username, use your GitHub username (not your email). The password is the PAT.

---

### 4. **Check for Two-Factor Authentication (2FA) Issues**
   If you have 2FA enabled on your GitHub account, you must use a PAT instead of your GitHub password. Ensure you're using the PAT correctly.

---

### 5. **Test Authentication with `curl`**
   To verify that your PAT is working, you can test it with `curl`:

   ```bash
   curl -H "Authorization: token <TOKEN>" https://api.github.com/user
   ```

   Replace `<TOKEN>` with your PAT. If the token is valid, this command will return your GitHub user details.

---

### 6. **Use a Credential Helper**
   If you don't want to include the PAT in the remote URL, you can use Git's credential helper to store the token securely:

   - Enable the credential helper:

     ```bash
     git config --global credential.helper store
     ```

   - Push your changes. Git will prompt you for your username and password:
     - **Username**: Your GitHub username.
     - **Password**: Your PAT.

   This will store the credentials in a file (e.g., `~/.git-credentials`) for future use.

---

### 7. **Check for Proxy or Firewall Issues**
   If you're behind a proxy or firewall, it might block the connection to GitHub. Configure Git to use the proxy:

   ```bash
   git config --global http.proxy http://proxyuser:proxypassword@proxy.server.com:port
   ```

   Replace `proxyuser`, `proxypassword`, `proxy.server.com`, and `port` with your proxy details.

---

### 8. **Debugging with `GIT_CURL_VERBOSE`**
   Enable verbose logging to get more details about the error:

   ```bash
   GIT_CURL_VERBOSE=1 git push origin main
   ```

   This will show detailed HTTP request and response information, which can help identify the issue.

---

### 9. **Common Errors and Fixes**
   - **Error: `remote: Invalid username or password`**:
     - Ensure you're using the correct PAT and username.
     - Regenerate the PAT if necessary.
   - **Error: `remote: Repository not found`**:
     - Verify the repository URL and ensure the PAT has access to the repository.
   - **Error: `403 Forbidden`**:
     - Check if the PAT has the correct permissions (`repo` scope).

---

### 10. **Alternative: Use SSH Instead of HTTPS**
   If you're still having trouble, consider using SSH instead of HTTPS for authentication:
   
   - [Generate an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and add it to your GitHub account.
   - Update the remote URL to use SSH:

     ```bash
     git remote set-url origin git@github.com:username/repository.git
     ```

   - Push your changes:

     ```bash
     git push origin main
     ```

---
