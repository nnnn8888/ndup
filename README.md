# Navigation web via manette — POC Gamepad API

Démonstration technique (proof of concept) d'une navigation alternative pour interfaces web, utilisant l'[API Gamepad](https://developer.mozilla.org/fr/docs/Web/API/Gamepad_API) standard du navigateur.

## Objectif

Montrer comment un contrôleur (manette de jeu type Xbox/PlayStation/Scuf) peut servir d'alternative au clavier/souris pour naviguer une interface web — cas d'usage pertinent pour :

- **Accessibilité motrice** : parcours alternatif pour utilisateurs ne pouvant pas utiliser un clavier/souris classique
- **Cloud gaming / interfaces TV** : navigation de catalogues produits, menus, ou sites vitrine depuis un salon, manette en main
- **Tests UX** : validation d'ergonomie et de latence d'un contrôleur sur des interfaces web

## Fonctionnement

- Détection automatique d'une manette connectée (`gamepadconnected`)
- Navigation haut/bas via D-pad ou stick gauche
- Sélection/désélection via boutons A / B
- Aucune dépendance externe — HTML/CSS/JS natif

## Utilisation

Ouvrir `index.html` dans un navigateur compatible (Chrome, Edge, Firefox), connecter une manette en Bluetooth ou USB, appuyer sur un bouton pour l'activer.

## Prestations associées

Ce POC sert de base à une offre d'audit et d'intégration accessibilité web incluant la navigation alternative (manette, switch access, clavier).

## Matériel utilisé

Tests réalisés avec un contrôleur Scuf (latence et ergonomie des boutons arrière/palettes évaluées pour un usage professionnel prolongé).
