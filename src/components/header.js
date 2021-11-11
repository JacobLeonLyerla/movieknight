import React from 'react'
import { Button } from 'reactstrap'
import { signInWithGoogle } from '../firebase/firebase.utils'
const header = () => {
    return (
        <Button  color="primary" type="button" onClick={signInWithGoogle} isGoogleSignIn>
        Sign In with google
      </Button>
    )
}

export default header
