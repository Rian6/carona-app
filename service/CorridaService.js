import { getDatabase, ref, push, set, onValue, child, get } from "firebase/database";

export function cadastrarCorrida(corrida, idUsuario) {
  const db = getDatabase();
  const postListRef = ref(db, idUsuario + '/corridas');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    corrida,
  }).then(
    console.log("certo")
  ).catch(
    console.log("erro")
  );
}

export async function buscarValorGasolina() {
  const db = getDatabase();
  const dbRef = ref(db);

  return get(child(dbRef, `/commons`)).then((snapshot) => {
    return snapshot.val()
  }).catch((error) => {
    console.error(error);
  });
}

export async function buscarCorridas(corr, idUsuario = 0) {
  const db = getDatabase();
  const dbRef = ref(db);

  return get(child(dbRef, `${idUsuario}/corridas`)).then((snapshot) => {
    let data = []
    snapshot.forEach((childSnapshot) => {
      let childData = childSnapshot.val();
      data.push(childData)
    });
    return data
  }).catch((error) => {
    console.error(error);
  });
}
