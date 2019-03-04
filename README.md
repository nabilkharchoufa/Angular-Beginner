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
