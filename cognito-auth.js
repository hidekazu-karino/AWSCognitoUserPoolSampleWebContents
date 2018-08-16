'use strict'
var poolData = {
    UserPoolId: 'ユーザープールID',
    ClientId: 'クライアントID'
}

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function signUp() {
    var email     = $('#email').val();
    var passwd    = $('#passwd').val();

    var emailInfo = {
        Name: 'email',
        Value: email
    };
    var attrList  = [];
    var attrEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(emailInfo);

    attrList.push(attrEmail);

    var messageText;
    userPool.signUp(email, passwd, attrList, null, function(err, result) {
        if (err) {
            console.log(err);
            messageText = err;
        } else {
            var cognitoUser = result.user;
            messageText = cognitoUser.getUsername() + 'is created';
        }

        alert(messageText);

        if (err) {
            location.replace('./signup.html');
        } else {
            location.replace('./signupconfirm.html');
        }
    });
}
function activateConfirm() {
    var email = $('#email').val();
    var code  = $('#code').val();

    var activateInfo = {
        Username: email,
        Pool: userPool
    };

    var messageText;
    
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(activateInfo);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            console.log(err);
            messageText = err;
        } else {
            messageText = cognitoUser.getUsername() + 'is confirmed';
        }

        alert(messageText);

        if (err) {
            location.replace('./signup.html');
        } else {
            location.replace('./login.html');
        }
    });
}

function login() {
    var email      = $('#email').val();
    var passwd     = $('#passwd').val();

    var authData   = {
        Username: email,
        Password: passwd
    };
    var authDetail = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authData);

    var activateInfo = {
        Username: email,
        Pool: userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(activateInfo);
    cognitoUser.authenticateUser(authDetail, {
        onSuccess: function(result) {
            alert('success');
            location.replace('./success.html');
        },
        onFailure: function(err) {
            alert('error: ' + err);
        }
    });
}
