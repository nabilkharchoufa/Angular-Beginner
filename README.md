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

Angular routing step-03 routage avec paramétres
===============================================

- - - - 

###Contenu du step ###
 - Required Parameters
 - Optional parameters
 - Query parameters

###Required Parameters ###

Dans le fichier app.module.ts ajouter les routes pour afficher le détail et la modification
Faite attention à la nommenctlature, nous les avons regroupés par 'films' ...

```Javascript 
const ROUTES = [
  { path: 'films', component: FilmsComponent },
  { path: 'films/:id', component: FilmDetailComponent },
  { path: 'films/:id/edit', component: EditFilmComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    FilmsComponent,
    FilmDetailComponent,
    EditFilmComponent
  ]
})
export class FilmModule { }
```
Maintenant on va activer les routes dans le html :

```html
<a [routerLink]="['/films',film.id]">
  {{ film.filmName }}
</a>
.......................
<button class="btn btn-outline-primary btn-sm" [routerLink]="['/films',film.id,'edit']">
  Modifier
</button>
```

Puisque c'est une petite application on se mettre d'accord que l'url de modification avec l'id 0 est pour la création (c'est pas propre je sais :))

```html
<li class="nav-item">
  <a class="nav-link" [routerLink]="['/films/', 0, 'edit']">Ajouter un film</a>
</li>
```

On atterrit sur les pages détail et modification mais on n'a pas encore fait le traitement nécessaire pour aficher le film .

* Manipuler les URLS

Service ActivatedRoute  :
 - Url segments
 - Route parameters
 - Query parameters
 - Resolver data
 - ............

D'abors il faut utiliser le service ActivatedRoute dans le component pour qu'on puisse récupérer l'id du film et le choisir dans le tableau

```javascript
constructor(private route: ActivatedRoute) { }
```

Deux façon de récupérer l'id 

 - Snapshot : Récupérer l'id une seule fois
 ```javascript 
 const id = this.route.snapshot.paramMap.get('id');
 ```
 - Observable : mettre un watch pour observer l'id à chaque changement 
 ```javascript 
this.route.paramMap.subscribe(
  params => {
    const id = params.get('id');
  }
);
 ```

* Approche Snapshot
 

 Dans le component de détail du film On va essayer de mettre un console.log dans le constructeur pour afficher l'id.

 ```javascript : 
    constructor(private filmService: FilmService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Le plus c'est pour le caster en number
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('id du film : ', id);
  }

  ```
Normalement on doit avoir dans la console le film choisit.

On utilise le id comme parametre pour récupérer le film : 


 ```javascript : 
    constructor(private filmService: FilmService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Le + c'est pour le caster en number
    const id = +this.route.snapshot.paramMap.get('id');
     this.getFilm(id);
  }
  ```
rafrachissez la page et bingo ça marche on a le détail du film 

on va implémenter la redirection des bouton retour et modifier dans le détail 

```html 
<button class="btn btn-outline-secondary mr-3" style="width:160px" [routerLink]="['/films']">
  <i class="fa fa-chevron-left"></i> Retour
</button>
<button class="btn btn-outline-primary" style="width:160px" [routerLink]="['/films',film.id,'edit']">
  Modifier
</button>
```

On fait la même chose pour la page de modification
Tester l'ajout de film...
Bien sûr que ça marche aussi ;-) 

* Récupérer l'id avec l'approche observable

remplacer la déclaration avec snapshot par le code suivants  


```javascript
    // TODO UNSUBSCRIBE
    this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getFilm(id);
      }
    );
```
Ajouter la redirection à la fin de l'enregistrement 

```javascript
  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.router.navigate(['/films']);
    // Navigate back to the film list
  }
```

###Optional parameters####
  on va pas le faire sur l'application mais voilà à quoi ça ressemble :

```html
<a  [routerLink]="['/films', {name: filmName, code: filmCode,
  startDate: availabilityStart, endDate: availabilityEnd}]">
```

Pour la lecture des paramètres optionnel on procéde comme ça : 
```javascript
import { ActivatedRoute } from '@angular/router';
.....
constructor(private route: ActivatedRoute) {
console.log(this.route.snapshot.paramMap.get('name'));
console.log(this.route.snapshot.paramMap.get('code'));
}
```
###Query Parameters###

Pour utiliser les query params on va faire l'excercice en gardant les valeur d'input text de filtre et l'affichage d'image dans les query params 

modifier la redirection vers le détail 

```html
 <a [routerLink]="['/films',film.id]"
      [queryParams]="{filterBy : listFilter, showImage: showImage}"
  >
```

faisant le test on voit que les valeur sont dans l'url qu'on arrive sur le détail mais une fois on appui sur le retour on les perds pour les garder on va modifier le redirection de retour sur le détail :

```html
<button class="btn btn-outline-secondary mr-3" style="width:160px" [routerLink]="['/films']"  queryParamsHandling="preserve">
  <i class="fa fa-chevron-left"></i> Retour
</button>
```
queryParamsHandling prend comme valeur 'preserve', 'merge', etc.

* Accéder aux query params 

Pour utiliser les infos qu'on a gardé dans l'url avec queryParamsHandling, on doit lire les queryParams, allez courage on est presque pour terminer le step :) 

Dans le ngOnInit du component films on va récupérer les valeurs en utilisant le queryParamMap 

```javascript
this._listFilter = this.route.snapshot.queryParamMap.get('filterBy');
this.showImage = JSON.parse(this.route.snapshot.queryParamMap.get('showImage'))
```

Angular routing step-04 Prefetching Data Using Route Resolvers
==============================================================

- - - - 

Les avantages : 
  - éviter d'afficher une page vide avant le chargement de données
  - Réutilisation de code
  - Gestion d'erreur meilleur


###Contenu du step ###

  - Providing Data with a Route
  - Using a Route Resolver
  - Building a Route Resolver Service
  - Adding a Resolver to a Route
  - Configuration
  - Reading Resolver Data - Snapshot
  - Reading Resolver Data - Observable

###Providing Data with a Route###
