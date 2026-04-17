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
- ~~Garder le shop en iframe~~ -> Tout en une seule page. G/n/rer le HTML avec JS?
- Utiliser le localStorage du shop pour gérer ce qui est acheté et pas:
```json
{
  item: {
    prix: 1111,
    tick_upgrade: 0.1,
    click_upgrade: 0,
    disponible: 1
  },
  item2: {
    prix: 543,
    tick_upgrade: 0.0,
    click_upgrade: 4,
    disponible: 0
  }
}
```