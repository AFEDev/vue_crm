import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await signInWithEmailAndPassword(getAuth(), email, password) 
            } catch (e) {
              throw error
            }
        },
        async logout() {
            await signOut(getAuth())
        }
    },
}