Copywrongs2
===========

# Local setup (ubuntu)

```
sudo apt-get install ruby ruby-dev
gem install jekyll
git clone git@github.com:Copywrongs-Gang/Copywrongs2.git copywrongs2
cd copywrongs2
jekyll serve --baseurl ''
```

# how to add translations
- copy _includes/de folder to _includes/*\*new_language_id*\*
- copy de/index.html file to *\*new_language_id*\*/index.html
- translate files in _includes/*\*new_language_id*\*/
- open _config.yml and add the new language to languages

# Based on Agency bootstrap theme

[Agency bootstrap theme ](http://startbootstrap.com/templates/agency/)