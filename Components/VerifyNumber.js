firebase
  .auth()
  .verifyPhoneNumber(phoneNumber)
  .on(
    "state_changed",
    phoneAuthSnapshot => {
      // How you handle these state events is entirely up to your ui flow and whether
      // you need to support both ios and android. In short: not all of them need to
      // be handled - it's entirely up to you, your ui and supported platforms.

      // E.g you could handle android specific events only here, and let the rest fall back
      // to the optionalErrorCb or optionalCompleteCb functions
      switch (phoneAuthSnapshot.state) {
        // ---------------------
        // ANDROID ONLY EVENTS
        // ---------------------
        case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
          console.log("auto verify on android timed out");
          // proceed with your manual code input flow, same as you would do in
          // CODE_SENT if you were on IOS
          break;
        case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
          // auto verified means the code has also been automatically confirmed as correct/received
          // phoneAuthSnapshot.code will contain the auto verified sms code - no need to ask the user for input.
          console.log("auto verified on android");
          console.log(phoneAuthSnapshot);
          // Example usage if handling here and not in optionalCompleteCb:
          // const { verificationId, code } = phoneAuthSnapshot;
          // const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

          // Do something with your new credential, e.g.:
          // firebase.auth().signInWithCredential(credential);
          // firebase.auth().currentUser.linkWithCredential(credential);
          // etc ...
          break;
      }
    },
    error => {
      // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
      // the ERROR case in the above observer then there's no need to handle it here
      console.log(error);
      // verificationId is attached to error if required
      console.log(error.verificationId);
    },
    phoneAuthSnapshot => {
      // optionalCompleteCb would be same logic as the AUTO_VERIFIED/CODE_SENT switch cases above
      // depending on the platform. If you've already handled those cases in the observer then
      // there's absolutely no need to handle it here.

      // Platform specific logic:
      // - if this is on IOS then phoneAuthSnapshot.code will always be null
      // - if ANDROID auto verified the sms code then phoneAuthSnapshot.code will contain the verified sms code
      //   and there'd be no need to ask for user input of the code - proceed to credential creating logic
      // - if ANDROID auto verify timed out then phoneAuthSnapshot.code would be null, just like ios, you'd
      //   continue with user input logic.
      console.log(phoneAuthSnapshot);
    }
  );
// optionally also supports .then & .catch instead of optionalErrorCb &
// optionalCompleteCb (with the same resulting args)
