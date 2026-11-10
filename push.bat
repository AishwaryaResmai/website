@echo off
echo ====================================================
echo  Vishwas Enterprises - GitHub Repository Sync
echo  Target: https://github.com/AishwaryaResmai/website.git
echo ====================================================
echo.

set GIT_EXE="%~dp0.git-bin\cmd\git.exe"

if exist %GIT_EXE% (
    echo [OK] Using portable Git...
    %GIT_EXE% push -u origin main
) else (
    echo [OK] Using system Git...
    git push -u origin main
)

echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Successfully pushed to https://github.com/AishwaryaResmai/website.git
) else (
    echo [INFO] If prompted for credentials, please enter your GitHub Personal Access Token (PAT).
    echo [INFO] Or use: %GIT_EXE% push https://YOUR_TOKEN@github.com/AishwaryaResmai/website.git main
)
echo.
pause

