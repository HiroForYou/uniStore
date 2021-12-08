import { bow, extractDictionary as dict } from "./bagOfWords.js";

function wordCountMap(str) {
  let words = str.split(" ");
  let wordCount = {};
  words.forEach((w) => {
    wordCount[w] = (wordCount[w] || 0) + 1;
  });
  return wordCount;
}
function addWordsToDictionary(wordCountmap, dict) {
  for (let key in wordCountmap) {
    dict[key] = true;
  }
}
function wordMapToVector(map, dict) {
  let wordCountVector = [];
  for (let term in dict) {
    wordCountVector.push(map[term] || 0);
  }
  return wordCountVector;
}
function dotProduct(vecA, vecB) {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}
function magnitude(vec) {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
}
function cosineSimilarity(vecA, vecB) {
  return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

function textCosineSimilarity(txtA, txtB) {
  const wordCountA = wordCountMap(txtA);
  const wordCountB = wordCountMap(txtB);
  let dict = {};
  addWordsToDictionary(wordCountA, dict);
  addWordsToDictionary(wordCountB, dict);
  const vectorA = wordMapToVector(wordCountA, dict);
  const vectorB = wordMapToVector(wordCountB, dict);
  return cosineSimilarity(vectorA, vectorB);
}

function getSimilarityScore(val) {
  return Math.round(val * 100);
}

function checkSimilarity(text1, text2) {
  const similarity = getSimilarityScore(textCosineSimilarity(text1, text2));
  return similarity;
}

export const recomendationSystem = (productId, products, limit) => {
  /* const [name, category] = product;
  let texts = [
    "I like\n, : ; chocolate",
    "Chocolate; is great",
    "I like  --boar ragu'",
    "I don't like artichokes",
  ];
  let voc = dict(texts);
  console.log(
    bow("boar like chocolate", voc),
    bow("Ragu is great and I like it", voc)
  ); */
  let scores = {};
  let recommendedProducts = [];
  const indexProductId = products.map((e) => String(e._id)).indexOf(productId);
  if (indexProductId !== -1) {
    let nameProductOrigin = products[indexProductId].name;
    products.forEach((element) => {
      if (String(element._id) !== productId) {
        scores[`${element._id}`] = checkSimilarity(
          nameProductOrigin,
          element.name
        );
      }
    });
    let entries = Object.entries(scores);
    let sorted = entries.sort((a, b) => b[1] - a[1]);
    let recommendedIds = [];
    for (let index = 0; index < limit; index++) {
      recommendedIds.push(sorted[index][0]);
    }
    recommendedProducts = products.filter(function (el) {
      return recommendedIds.includes(String(el._id));
    });
    return recommendedProducts;
  }
};
