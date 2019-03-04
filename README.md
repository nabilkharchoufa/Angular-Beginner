Angular routing step-01
=======================

- - - - 

# Mettre en place le routage #

    * Définir le base path (Optionnel)
    * Import le router 
    * Configurer la route 
    * Mettre en place dans la template 
    * Activate route
    
## définir le base path ##
`ng build --base-href /ateam/`
## importer Angular Routing ##
```javascript 
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FilmData, { delay: 1000 }),
    RouterModule.forRoot([]),
  ],...
```


### Ajouter la configuration de routes  ###
Ajouter la configuration de routes dans la déclaration de notre RouterModule
```javascript    
      RouterModule.forRoot([
      { path: 'welcome', component: ATeamComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]),
```

#### Mettre en place les directives dans les templates ####
Ajouter les directives routerLink dans le app.component.html
```html
    <li class="nav-item">
      <a class="nav-link" [routerLink]="['/welcome']">Accueil</a>
    </li>
    <li class="nav-item">
      <a class="nav-link">Films</a>
    </li>
```
Angular routing step-02
=======================

#### Mettre en place le routage à une fonctionalité ####
Importer le routerModule et configurer la route
```javascript
   @NgModule({
    imports: [
      SharedModule,
      RouterModule.forChild([
      {path: 'films', component: FilmsComponent}
      ])
    ],
    declarations: [
      FilmsComponent,
      EditFilmComponent
    ]
  })
```
Activer le routage 
```html
    <li class="nav-item">
      <a class="nav-link" [routerLink]="['/welcome']">Accueil</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" [routerLink]="['/films']">Films</a>
    </li>
```
####Strategie de nommage de path des routes ####

####Activer une route depuis le code ####

####implémenter les fonctionalité se connecter et se déconnecter ####
Répeter les mêmes étapes que "mettre en place le routage à une fonctionnalité pour ajouter le routage à la page login" dans User.module.ts

injecter le Router dans le constructeur 
```javascript
constructor(private authService: AuthService, private router: Router) { }
```

activer la route depuis le code pour rediriger l'utilsateur vers la page de login 
```javascript
this.router.navigate(['/films']);
```

Maintenant il faut définir le logout, allez dans le app.component.ts et créer le lougout() :
```javascript
  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
  ```
Pourquoi définir des routes dans chaque module ?

ordre d'imports est-il intéressant ?


###Mieux organiser le code ###
créer un fichier app-routing.module.ts à côté de app.module.ts avec la déclaration de nos routes 
```javascript
import { PageNotFoundComponent } from './page-not-found.component';
import { ATeamComponent } from './a-team/a-team.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes = [
  { path: 'welcome', component: ATeamComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports : [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
Remplacer la déclaration de nos routes dans app.module.ts par un simple imports de AppRoutingModule
```javascript
imports: [
    SharedModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FilmData, { delay: 1000 }),
    AppRoutingModule,
    FilmModule,
    UserModule,
    MessageModule,
    BrowserModule
  ],
```
essayer est-ce que l'application marche toujours  ? 

C'est normal il faut respecter l'ordre pour que les routes fils soient reconnue
```javascript
imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FilmData, { delay: 1000 }),
    SharedModule,
    FilmModule,
    UserModule,
    MessageModule,
    AppRoutingModule
  ],
```


