import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await signInWithEmailAndPassword(getAuth(), email, password) 
            } catch (e) {
                console.log(e);
                commit('setError', e)
              throw e
            }
        },
        async logout() {
            await signOut(getAuth())
        },
        async register({commit},{email, password, name}) {
            try {
                await createUserWithEmailAndPassword(getAuth(), email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user; 
                    const db = getDatabase();
                    set(ref(db, `users/${user.uid}/info`), {
                        bill: 1000,
                        name : name
                    })
        })
            } catch (e) {
               commit('setError', e)
                throw e
            }
        },
    },
}