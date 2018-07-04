# Loguer

Je vais sur le panier -> paiment

# Non Loguer

// Panier

Total,
Detail (quantité, tva, prix HT)

// Name , Tel, Email -> Créer un Utilisateur
-> Créer une commande (status = 0 : En attente de paiement)

// Paiement : Source
-> Customer (Name , tel , Email)
-> Charge (source, customer) - Stripe

Capture : true

- Si aujourd'hui ET heures d'aujourd'hui : capture = false
- Sinon capture = true

BO Employé:

- Commande passée , remonté en BO
  Zappo: peut valider / refuser (tel)

# Logué
