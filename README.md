Angular Forms
=============

- - - - 

# Mettre en place les formulaires #

Il y a deux façon de faire les formulaires : 

  - Template driven Forms
  - Reactive forms

## les Template driven Forms ##

Définition :
  * Toute la logique va être centraliser dans les templates
  * C'est une façon de faire inspirer de AngularJs
  * C'est rapide 
  * Html validation
  * Two way data binding 

Responsabilités : 

Template
  - Form element
  - Input element(s)
  - Data binding
  - Validation rules (attributes)
  - Validation error messages
  - Form model automatically generated

Component Class
  - Properties for data binding (data model)
  - Methods for form operations, such as submit

## Hands-on ##

Nous allons créer une application angular qui gère l'inscription des utilisateurs.

```bash
ng new labForm --skip-tests
```

Installer bootstrap 

```bash
npm install bootstrap
```

Réferencier dans le fichier style.css
```css
/* You can add global styles to this file, and also import other style files */
@import "~bootstrap/dist/css/bootstrap.min.css";

div.card-header {
 font-size: large;
}

div.card {
  margin-top: 10px
}
```

Créer le component user
```bash
ng g c user
```

Remplacer le contenu de app.component.html par

```html
<div class="container">
  <app-user></app-user>
</div>
```
importer formMdule dans app.module.ts pour avoir accès à :
- ngForm 
- ngModel
- ngModelGroup

```javascript
@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Mettre le code html ci-dessous dans le fichier user.component.html

```html
<div class="card">
  <div class="card-header">
    Inscription
  </div>

  <div class="card-body">
    <form>

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="firstNameId">Prénom</label>
        <div class="col-md-8">
          <input class="form-control" id="firstNameId" type="text" placeholder="Prénom (obligatoire)"/>
        </div>
      </div>

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="lastNameId">Nom</label>
        <div class="col-md-8">
          <input class="form-control" id="lastNameId" type="text" placeholder="Nom (obligatoire)" />
        </div>
      </div>

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="emailId">Email</label>
        <div class="col-md-8">
          <input class="form-control" id="emailId" type="email" placeholder="Email (obligatoire)"/>
        </div>
      </div>

      <div class="form-group row mb-2">
        <div class="col-md-8">
          <div class="form-check">
            <label class="form-check-label">
              <input class="form-check-input" id="sendCatalogId" type="checkbox"
                name="sendCatalog"> Envoyer moi le catalogue
            </label>
          </div>
        </div>
      </div>

      <div *ngIf="user.sendCatalog">
        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label pt-0">Type d'adresse</label>
          <div class="col-md-8">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="home"
                  name="addressType"> Domicile
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="work"
                  name="addressType"> Travail
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="other"
                  name="addressType"> Autre
              </label>
            </div>
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="street1Id">Address</label>
          <div class="col-md-8">
            <input class="form-control" id="street1Id" type="text" placeholder="Adresse"
              name="street1">
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="street2Id">Complément d'address</label>
          <div class="col-md-8">
            <input class="form-control" id="street2Id" type="text" placeholder="Complément d'address"
              name="street2">
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="cityId">Ville, Régions, Code postale</label>
          <div class="col-md-3">
            <input class="form-control" id="cityId" type="text" placeholder="ville"
              name="city">
          </div>
          <div class="col-md-3">
            <select class="form-control" id="stateId" name="state">
              <option value="" disabled selected hidden>Selectionner une région...</option>
              <option value="Al">Alsace, Champagne-Ardenne et Lorraine</option>
              <option value="Aq">Aquitaine, Limousin et Poitou-Charentes</option>
              <option value="Au">Auvergne et Rhône-Alpes</option>
              <option value="Bo">Bourgogne et Franche Comté</option>
              <option value="La">Languedoc-Roussillon et Midi-Pyrénées</option>
              <option value="No">Nord-Pas-de-Calais et Picardie</option>
              <option value="Ba">Basse-Normandie et Haute-Normandie</option>
            </select>
          </div>
          <div class="col-md-2">
            <input class="form-control" id="zipId" type="number" placeholder="Code postale"
              name="zip">
          </div>
        </div>
      </div>

      <div class="form-group row mb-2">
        <div class="offset-md-2 col-md-4">
          <button class="btn btn-primary mr-3" type="" style="width:160px">
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
```

créer la classe model user.ts dans le répertoire user
```javascript
export class User {
  constructor(public firstName = '',
              public lastName = '',
              public email = '',
              public sendCatalog = false,
              public addressType = 'home',
              public street1?: string,
              public street2?: string,
              public city?: string,
              public state = '',
              public zip?: string) { }
}
```

Mettre le code typeScript ci-dessous dans le fichier user.component.ts

```javascript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = new User();
  constructor() { }
  ngOnInit() {
  }
}
```

Maintenant on a une base de code pour commencer à créer notre formulaire template-driven

### Two-way data binding with ngModel ###

- Lier la template au model
- Chaque fois que angular trouve ngModel il va créer un formControl avec comme clé le 'name' et va l'attacher à formGroup

Trois façon possible de le faire : 
1. [(ngModel)] => Two-way data binding
2. [ngModel] => 
3. ngModel => 

Pour plus d'infos aller sur la doc officielle :
https://angular.io/guide/template-syntax#ngModel

Mettez l'attribut sur les éléments de la template on mettant comme valeur l'attribut qui lui correspond dans le model User

```html
<div class="card">
  <div class="card-header">
    Inscription
  </div>

  <div class="card-body">
    <form>

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="firstNameId">Prénom</label>
        <div class="col-md-8">
          <input class="form-control" id="firstNameId" type="text" placeholder="Prénom (obligatoire)"
          [(ngModel)]="user.firstName" name="firstName" />
        </div>
      </div>

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="lastNameId">Nom</label>
        <div class="col-md-8">
          <input class="form-control" id="lastNameId" type="text" placeholder="Nom (obligatoire)"
          [(ngModel)]="user.lastName" name="lastName" />
        </div>
      </div>

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="emailId">Email</label>
        <div class="col-md-8">
          <input class="form-control" id="emailId" type="email" placeholder="Email (obligatoire)"
           [(ngModel)]="user.email" name="email" />
        </div>
      </div>

      <div class="form-group row mb-2">
        <div class="col-md-8">
          <div class="form-check">
            <label class="form-check-label">
              <input class="form-check-input" id="sendCatalogId" type="checkbox" [(ngModel)]="user.sendCatalog"
                name="sendCatalog"> Envoyer moi le catalogue
            </label>
          </div>
        </div>
      </div>

      <div *ngIf="user.sendCatalog">
        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label pt-0">Type d'adresse</label>
          <div class="col-md-8">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="home"
                  [(ngModel)]="user.addressType" name="addressType"> Domicile
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="work"
                  [(ngModel)]="user.addressType" name="addressType"> Travail
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="other"
                  [(ngModel)]="user.addressType" name="addressType"> Autre
              </label>
            </div>
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="street1Id">Address</label>
          <div class="col-md-8">
            <input class="form-control" id="street1Id" type="text" placeholder="Adresse"
              [(ngModel)]="user.street1" name="street1">
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="street2Id">Complément d'address</label>
          <div class="col-md-8">
            <input class="form-control" id="street2Id" type="text" placeholder="Complément d'address"
              [(ngModel)]="user.street2" name="street2">
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="cityId">Ville, Régions, Code postale</label>
          <div class="col-md-3">
            <input class="form-control" id="cityId" type="text" placeholder="ville" [(ngModel)]="user.city"
              name="city">
          </div>
          <div class="col-md-3">
            <select class="form-control" id="stateId" [(ngModel)]="user.state" name="state">
              <option value="" disabled selected hidden>Selectionner une région...</option>
              <option value="Al">Alsace, Champagne-Ardenne et Lorraine</option>
              <option value="Aq">Aquitaine, Limousin et Poitou-Charentes</option>
              <option value="Au">Auvergne et Rhône-Alpes</option>
              <option value="Bo">Bourgogne et Franche Comté</option>
              <option value="La">Languedoc-Roussillon et Midi-Pyrénées</option>
              <option value="No">Nord-Pas-de-Calais et Picardie</option>
              <option value="Ba">Basse-Normandie et Haute-Normandie</option>
            </select>
          </div>
          <div class="col-md-2">
            <input class="form-control" id="zipId" type="number" placeholder="Code postale" [(ngModel)]="user.zip"
              name="zip">
          </div>
        </div>
      </div>

      <div class="form-group row mb-2">
        <div class="offset-md-2 col-md-4">
          <button class="btn btn-primary mr-3" type="" style="width:160px">
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
<br>
<!-- TODO delete this  -->
<pre>User : {{ user | json }}</pre>
```
C'est bien, mais c'est pas suffisant, nous allons maintenant donner une référence à notre form

user.component.html
```html
<form novalidate (ngSubmit)="save(signupForm)" #signupForm="ngForm">
  ..............
<button class="btn btn-primary mr-3" type="submit" style="width:160px">
  Enregistrer
</button>
```

user.component.ts
```javascript
save(userForm: NgForm) {
    console.log(userForm.form);
    console.log('Saved: ' + JSON.stringify(userForm.value));
  }
```

novalidate : pour empêcher le navigateur d'ajouter ces validations et laisser Angular gérer.

ngSubmit : déléguer la soumission du formulaire à la fonction save(signupForm)

Nous n'avons pas créé de directive ngForm ? En fait Angular le crée automatiquement quand il trouve une balise.

La directive NgForm a plusieurs fonctionnalités utile. Elle fournit les contrôles que vous avez besoin pour les éléments marqué avec l'attribut ngModel et la propriété 'name', surveille leurs propriétés et leurs validités. Elle a aussi la propriété 'valid' qui est 'true' seulement si et seulement tous les contrôles de ses éléments est valide.

Angular nous fournit la possibilité de surveiller plusieurs états du formulaire à savoir :


Value Changed
* pristine
* dirty

Validity
* valid
* errors

Visited
* touched
* untouched

Changer la partie qu'on utilise pour tracker la valeur de notre form

```html
<!-- TODO delete this -->
<br>Dirty: {{ signupForm.dirty }}
<br>Touched: {{ signupForm.touched }}
<br>Valid: {{ signupForm.valid }}
<br>Value: {{ signupForm.value | json }}
```
la validité du formulaire est true parce qu'il n'y a aucun contrôle sur les éléments du formulaire, nous allons nous aventurer dans le monde de validation tout de suite ;-).

```html
 <input class="form-control" id="firstNameId" type="text" placeholder="Prénom (obligatoire)" required
            minlength="3" [(ngModel)]=user.firstName name="firstName" #firstNameVar="ngModel"
            [ngClass]="{'is-invalid': (firstNameVar.touched || firstNameVar.dirty) && !firstNameVar.valid }" />
             <span class="invalid-feedback">
            <span *ngIf="firstNameVar.errors?.required">
              Le prénom est obligatoir.
            </span>
            <span *ngIf="firstNameVar.errors?.minlength">
              le prénom doit contenir au minimum 3 caractères.
            </span>
          </span>
```
Angular nous fournit des attributs pour valider nos éléments comme 'required' et 'minlength="3"'

C'est quoi le firstNamVar ? 

On peut exporter le ngModel dans une référence comme on a fait pour le 'form', ça va nous permettre d'accéder au formControl de chaque élément du formulaire.
c'est très utile, parce qu'on va pouvoir tester, est-ce que l'utilisateur a touché un élément (focus) ou pas, est-ce qu'il l'a modifié ? Est-ce que notre élément est valide ? Est-ce qu'il y a des erreurs ?

Ajouter les autres contrôles nécessaire.

De la même façon, on peut désactiver le bouton "enregistrer" jusqu'à ce que le formulaire devient valide, et ajouter aussi des tooltips :)

```html
<button class="btn btn-primary mr-3" type="submit" style="width:160px"
  [title]="signupForm.valid ? 'Enregistrer vos données' : 'Désactiver tant que le formulaire n'est pas valide"
  [disabled]="!signupForm.valid">
  Enregistrer
</button>
```
Notre formulaire doit ressembler à ça à la fin 

```html
<div class="card">
  <div class="card-header">
    Inscription
  </div>

  <div class="card-body">
    <form novalidate (ngSubmit)="save(signupForm)" #signupForm="ngForm">

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="firstNameId">Prénom</label>
        <div class="col-md-8">
          <input class="form-control" id="firstNameId" type="text" placeholder="Prénom (obligatoire)" required
            minlength="3" [(ngModel)]=user.firstName name="firstName" #firstNameVar="ngModel"
            [ngClass]="{'is-invalid': (firstNameVar.touched || firstNameVar.dirty) && !firstNameVar.valid }" />
          <span class="invalid-feedback">
            <span *ngIf="firstNameVar.errors?.required">
              Le prénom est obligatoir.
            </span>
            <span *ngIf="firstNameVar.errors?.minlength">
              le prénom doit contenir au minimum 3 caractères.
            </span>
          </span>
        </div>
      </div>

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="lastNameId">Nom</label>
        <div class="col-md-8">
          <input class="form-control" id="lastNameId" type="text" placeholder="Nom (obligatoire)" required
            maxlength="50" [(ngModel)]="user.lastName" name="lastName" #lastNameVar="ngModel"
            [ngClass]="{'is-invalid': (lastNameVar.touched || lastNameVar.dirty) && !lastNameVar.valid }" />
          <span class="invalid-feedback">
            <span *ngIf="lastNameVar.errors?.required">
              Le nom est obligatoir.
            </span>
            <span *ngIf="lastNameVar.errors?.maxlength">
              le nom doit contenir au maximum 50 caractères.
            </span>
          </span>
        </div>
      </div>

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label" for="emailId">Email</label>
        <div class="col-md-8">
          <input class="form-control" id="emailId" type="email" placeholder="Email (required)" required email
            [(ngModel)]="user.email" name="email" #emailVar="ngModel"
            [ngClass]="{'is-invalid': (emailVar.touched || emailVar.dirty) && !emailVar.valid }" />
          <span class="invalid-feedback">
            <span *ngIf="emailVar.errors?.required">
              Merci de saisir une adresse mail.
            </span>
            <span *ngIf="emailVar.errors?.email">
              Merci de saisir une adresse mail valid.
            </span>
          </span>
        </div>
      </div>

      <div class="form-group row mb-2">
        <div class="col-md-8">
          <div class="form-check">
            <label class="form-check-label">
              <input class="form-check-input" id="sendCatalogId" type="checkbox" [(ngModel)]="user.sendCatalog"
                name="sendCatalog"> Envoyer moi le catalogue
            </label>
          </div>
        </div>
      </div>

      <div *ngIf="user.sendCatalog">
        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label pt-0">Type d'adresse</label>
          <div class="col-md-8">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="home"
                  [(ngModel)]="user.addressType" name="addressType"> Domicile
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="work"
                  [(ngModel)]="user.addressType" name="addressType"> Travail
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" id="addressType1Id" type="radio" value="other"
                  [(ngModel)]="user.addressType" name="addressType"> Autre
              </label>
            </div>
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="street1Id">Address</label>
          <div class="col-md-8">
            <input class="form-control" id="street1Id" type="text" placeholder="Adresse" [(ngModel)]="user.street1"
              name="street1">
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="street2Id">Complément d'address</label>
          <div class="col-md-8">
            <input class="form-control" id="street2Id" type="text" placeholder="Complément d'address"
              [(ngModel)]="user.street2" name="street2">
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label" for="cityId">Ville, Régions, Code postale</label>
          <div class="col-md-3">
            <input class="form-control" id="cityId" type="text" placeholder="ville" [(ngModel)]="user.city" name="city">
          </div>
          <div class="col-md-3">
            <select class="form-control" id="stateId" [(ngModel)]="user.state" name="state">
              <option value="" disabled selected hidden>Selectionner une région...</option>
              <option value="Al">Alsace, Champagne-Ardenne et Lorraine</option>
              <option value="Aq">Aquitaine, Limousin et Poitou-Charentes</option>
              <option value="Au">Auvergne et Rhône-Alpes</option>
              <option value="Bo">Bourgogne et Franche Comté</option>
              <option value="La">Languedoc-Roussillon et Midi-Pyrénées</option>
              <option value="No">Nord-Pas-de-Calais et Picardie</option>
              <option value="Ba">Basse-Normandie et Haute-Normandie</option>
            </select>
          </div>
          <div class="col-md-2">
            <input class="form-control" id="zipId" type="number" placeholder="Code postale" [(ngModel)]="user.zip"
              name="zip">
          </div>
        </div>
      </div>

      <div class="form-group row mb-2">
        <div class="offset-md-2 col-md-4">
          <button class="btn btn-primary mr-3" type="submit" style="width:160px"
            [title]="signupForm.valid ? 'Enregistrer vos données' : 'Merci de corriger les erreurs pour pouvoir enregistrer '"
            [disabled]="!signupForm.valid">
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
<br>Dirty: {{ signupForm.dirty }}
<br>Touched: {{ signupForm.touched }}
<br>Valid: {{ signupForm.valid }}
<br>Value: {{ signupForm.value | json }}

```

# Conclusion #

Je suis d'accord avec vous sur le fait que c'est facile et rapide, mais je tiens à préciser que ça peut vite fait devenir très difficile à maintenir et à répondre à des scénarios complexes comme :

* Ajout dynamique d'élément dans le formulaire comme un bloc d'adresse
* Il faut tout le temps surveiller ce que l'utilisateur est entrain de saisir
* Attendre que l'utilisateur finit la saisi pour afficher les message d'erreurs 
* Des validations complexes à mettre en place
* Immutabilité de données utilisée

Pour cela, Angular a une deuxième façon de faire les formulaires plus stylé et classe qu'on va aborder dans la session de Intermidéaire 


