git push origin master -f
git checkout -b deploy
git push origin deploy -f
git checkout master
git branch -D deploy