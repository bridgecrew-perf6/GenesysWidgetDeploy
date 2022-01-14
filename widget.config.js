//Org id 
const orgId = '330b1778-89eb-418a-a486-5ee7d331726a';
//Base region url. Example: login.cac1.pure.cloud to login, base url is cac1.pure.cloud
const baseRegionUrl = 'cac1.pure.cloud';
//Replace text between the single quotes with the widget deployment key, no extra spaces or characters
const chatDeploymentKey = '2f180aed-8175-4b77-8b29-cc53734cedda';
//Replace text between the single quotes with the exact name of the target workgroup
const chatTargetQueue = 'Coop_Webchat_Test';   
//Priority, do not use single or double quotes for this value
const chatPriority = 2;


//Form validation functions
function basicValidation (event, form, input, label, $, CXBus, Common) {
    if (!input || input.val() === '')
    {
        return false;
    }
    let digits = /\d/;
    let re = new RegExp(digits);
    return !re.test(input.val());
}

function emailValidation (event, form, input, label, $, CXBus, Common) {
    let emailPattern = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/;
    let re = new RegExp(emailPattern);
    if(input && re.test(input.val()))
        return true;
    else if (input && input.val() === "")
        return true;
    else
        return false;
}


function selectValidation (event, form, input, label, $, CXBus, Common) {
    if (input && input.val() === '')
        return false;
    else
        return true;
}



window._genesys = {
    widgets: {
        main: {
            debug: true,
            preload: ['webchat']
        },
        webchat: {
            transport: {
                type: 'purecloud-v2-sockets',
                dataURL: `https://api.${baseRegionUrl}`,
                deploymentKey : chatDeploymentKey,
                orgGuid: orgId,
                interactionData: {
                    routing: {
                        targetType: 'QUEUE',
                        targetAddress: chatTargetQueue,            
                        priority: chatPriority
                    }
                }
            },
            chatButton : {
                enabled : false,
            },
            userData: {

            },
            markdown: true,
            form: {
                autoSubmit: false,
                wrapper: '<table></table>',
                inputs: [
                    // Default fields
                    {
                        id: 'cx_webchat_form_firstname',
                        name: 'firstname',
                        maxlength: '100',
                        placeholder: 'Required',
                        label: 'First Name',
                        validateWhileTypeing: true,
                        validate: basicValidation
                    },
                    {
                        id: 'cx_webchat_form_lastname',
                        name: 'lastname',
                        maxlength: '100',
                        placeholder: 'Required',
                        label: 'Last Name',
                        validateWhileTypeing: true,
                        validate: basicValidation
                    },
                    {
                        id: 'cx_webchat_form_email',
                        name: 'email',
                        maxlength: '100',
                        placeholder: 'Optional',
                        label: 'Email',
                        validateWhileTypeing: true,
                        validate: emailValidation
                    },
                    {
                        id: 'cx_webchat_form_subject',
                        name: 'subject',
                        maxlength: '100',
                        placeholder: 'Optional',
                        label: 'Subject'
                    }
                ]
            },

        },
    }
    
};
