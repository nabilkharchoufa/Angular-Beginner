Angular i18n avec step-01
=========================

- - - - 

# Mettre en place i18n #

Pour mettre en place l'internationalisation, nous allons utiliser l'api ngx-translate

Pour l'installer vous dervrez lancer la commande angular cli 
```bash
npm install @ngx-translate/core @ngx-translate/http-loader rxjs --save
```
ajouter le module TranslateModule dans le app.module.ts

```javascript
TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    //.................
    // required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
```
créer les fichier en.json de i18n dans le répertoir /assets/i18n/
```json
{
  "ateam": {
    "title": "A-Team-EN",
    "text": "This application created by your freinds Nabil && Ibrahim enjoy it"
  }
}
```
initialiser la lang par défaut dans le app.component.ts
```javascript 
  constructor(private authService: AuthService,
    private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
```
utiliser le pipe translate pour traduire le titre de l'application
```html
<a class="navbar-brand">{{'ateam.title' | translate}}</a>
```

testez, ça marche pas, oui c'est normal, le InMemoryWebApi bloque l'accés aux fichiers de i18n, pour corriger ce problème modifier le param du InMemoryWebApiModule

```javascript
    InMemoryWebApiModule.forRoot(FilmData, { delay: 1000, passThruUnknownUrl: true }),
```

Félicitation vous avez fait le premier pas :)

Maintenant on va essayer d'ajouter un bouton pour modifier la langue 

créer les fichier fr.json de i18n dans le répertoir /assets/i18n/
```json
{
  "ateam": {
    "title": "A-Team-FR",
    "text": "Application développée parAngular Team Nabil && Ibrahim enjoy it"
  }
}
```

dans le app.component.html ajouter le code suivant 
```html
    <li class="nav-item">
      <div class="btn-group" role="group" aria-label="Language">
        <button type="button" class="btn btn-outline-secondary" (click)="toggleLanguage('fr')"
          [ngClass]="{active: language==='fr'}">FR</button>
        <button type="button" class="btn btn-outline-secondary" (click)="toggleLanguage('en')"
          [ngClass]="{active: language==='en'}">EN</button>
      </div>
    </li>
```
Créer la fonction dans app.component.ts 
```javascript
  toggleLanguage(language: string): void {
    this.language = language;
    this.translate.use(this.language);
  }
```

