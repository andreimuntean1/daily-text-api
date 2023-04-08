# Daily text REST API

This is a lightweight and typesafe REST API that fetches the daily text from jw.org. You can retrieve the text on different dates and languages. If these params are not provided, the response consists in the daily text from the current day, in english.

## Get the daily text

```
GET /
```

### Optional parameters

| Name   | Type     | Description                                            | Default value | Example      |
| ------ | -------- | ------------------------------------------------------ | ------------- | ------------ |
| `date` | _string_ | The date for which you want to get the daily text for. | Current date  | `08/21/2023` |
| `lang` | _string_ | The language the daily text should be fetched.         | English       | `fr`         |

### Example response

```javascript
fetch("/?date=04/08/2023&lang=fr");
```

```json
{
  "verse": "Jean 17:3",
  "text": "Ceci signifie la vie éternelle: qu’ils apprennent à te connaître, toi, le seul vrai Dieu, et celui que tu as envoyé, Jésus Christ.",
  "comentary": "Suivre les traces de Jésus mène à la vie éternelle. Un jour, un jeune homme riche a demandé à Jésus ce qu’il devait faire pour avoir la vie éternelle. Jésus lui a répondu : « Viens, suis-moi » (Mat. 19:16-21). Et à des Juifs qui ne croyaient pas qu’il était le Christ, il a dit : « Mes brebis [...] me suivent. Je leur donne la vie éternelle » (Jean 10:24-29). Nous exerçons la foi en Jésus en appliquant ce qu’il a enseigné et en imitant ce qu’il a fait. C’est à cette condition que nous resterons sur la route qui mène à la vie éternelle (Mat. 7:14). Pour être en mesure de suivre fidèlement les traces de Jésus, nous devons tout d’abord apprendre à le connaître. ‘Apprendre à connaître’ Jésus ne se fait pas rapidement. Nous devons chercher à cerner de mieux en mieux le genre de personne qu’il est : ses qualités, sa façon de penser et ses normes morales. Même si nous sommes chrétiens depuis longtemps, nous devons continuer d’apprendre à connaître Jéhovah et son Fils. w21.04 4 § 9-10.",
  "url": "https://www.jw.org/finder?srcid=jwlshare&wtlocale=F&alias=daily-text&date=20230408"
}
```

## Run locally

### Clone the repository

```
git clone https://github.com/andreimuntean1/daily-text-api.git
```

### Install dependencies

```
npm install
```

### Compile the code and start the server

```
npm run build
npm start
```

### Or do both at once

```
npm run dev
```
