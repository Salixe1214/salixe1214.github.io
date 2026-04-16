[Site](https://salixe1214.github.io/)

```bash
eval `ssh-agent -s`
ssh-add ~/.ssh/github
git push
```

## TODO
A faire
- [ ] Faire le [shop](#shop)
- [ ] Minijeu de pêche

### Shop
- Garder le shop en iframe
- Utiliser le localStorage du shop pour gérer ce qui est acheté et pas
- Utiliser des send message pour dire au jeux d'augmenter le tick rate, les pts ou le click rate (voir game.js:47) `window.postMessage({sender: "me", message: "allo"}, "*")`
- Ajouter un sendMessage au clear et au save pour que le shop se clear/save en meme temp que le jeu