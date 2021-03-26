git push origin master
git checkout -b deploy
git push origin deploy
git checkout master
git branch -D deploy