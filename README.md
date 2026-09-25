# Onova AutoML server (`automl-server`)

> Part of [Onova](https://www.onova.co/), a mobile marketplace for second-hand and sustainable clothing that [Gianfranco Palumbo](https://github.com/gianpaj) and Alex Kostinskyi built in Lviv, Ukraine. The company ran until September 2019. This repository is an archive and is not maintained.

A prototype from October 2019 for "rabbit", Onova's Instagram importer. Sellers linked their Instagram account to Onova, and a scheduled job scraped their recent posts. A Google Cloud AutoML Vision single-label classifier, trained on an `items_for_sale` dataset, labelled each post's first image `sale` or `notforsale`. Posts labelled `sale` became products in a drop on the seller's Onova shop, with the price parsed from the caption.

This repository only tests the prediction call. The production version lives in `server/runners/instagram.runner.js` in [onova-server.data](https://github.com/gianpaj/onova-server.data). The classifier was switched off in March 2020, and the importer kept running without it.

| | |
|---|---|
| First commit | 2019-10-10 |
| Last commit | 2019-10-14 |
| Commits | 4 by Gianfranco |

### Onova repositories

- [onova-mobileapp](https://github.com/gianpaj/onova-mobileapp): the Onova and Drop iOS and Android apps
- [onova-server.data](https://github.com/gianpaj/onova-server.data): the REST API
- [onova-server.data.global](https://github.com/gianpaj/onova-server.data.global): the API fork for an international version
- [onova-server.push](https://github.com/gianpaj/onova-server.push): push notifications
- [onova-server.chat](https://github.com/gianpaj/onova-server.chat): order messages in buyer–seller chats
- [onova-webapp-drop](https://github.com/gianpaj/onova-webapp-drop): the Drop web app
- [onova-forest-admin](https://github.com/gianpaj/onova-forest-admin): the back office
- [onova-automl-server](https://github.com/gianpaj/onova-automl-server): an image classifier prototype

---

## Original README

- Agenda Schedule job (runner)
- Google Auto ML Kit (online prediction)

## Google Auto ML Kit

- Image Classification
- Single-Label Classification

Google Cloud Platform - Vision - Dataset:
[items_for_sale](https://console.cloud.google.com/vision/datasets/ICN4163459108248223744/images?project=onova-183307)

### Example taken from
https://github.com/googleapis/nodejs-automl/blob/master/samples/quickstart.js

### Docs
https://cloud.google.com/vision/automl/object-detection/docs/predict
