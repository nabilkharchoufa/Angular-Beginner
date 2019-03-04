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

Deux façon pour le faire :

   
    1. Le faire à la main 
    2. Utiliser Angular CLI

`ng build --base-href /ateam/`

`<base href="/">`

`(localhost:4200)`

`<base href="/ateam/">`

## importer Angular Routing ##

RouterModule c'est un module externe 

Service =>  gérer la navigation et la manipulation de l'url  
Configuration => pour configurer les routes 
Directives => 
- RouterLink=> les élements cliquable 
- RouterLinkActive=> style des elements active 
- RouterOutlet=> quand il faut afficher une template 

Avant d'utiliser le routage il faut importer le RouterModule dans le app.module.ts
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],...
 