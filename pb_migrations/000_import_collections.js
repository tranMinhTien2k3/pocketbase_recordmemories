/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
    console.log("Importing initial collections...")

    const collections = [
        {
            "id": "pbc_3142635823",
            "listRule": null,
            "viewRule": null,
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "name": "_superusers",
            "type": "auth",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "cost": 0,
                    "hidden": true,
                    "id": "password901924565",
                    "max": 0,
                    "min": 8,
                    "name": "password",
                    "pattern": "",
                    "presentable": false,
                    "required": true,
                    "system": true,
                    "type": "password"
                },
                {
                    "autogeneratePattern": "[a-zA-Z0-9]{50}",
                    "hidden": true,
                    "id": "text2504183744",
                    "max": 60,
                    "min": 30,
                    "name": "tokenKey",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "exceptDomains": null,
                    "hidden": false,
                    "id": "email3885137012",
                    "name": "email",
                    "onlyDomains": null,
                    "presentable": false,
                    "required": true,
                    "system": true,
                    "type": "email"
                },
                {
                    "hidden": false,
                    "id": "bool1547992806",
                    "name": "emailVisibility",
                    "presentable": false,
                    "required": false,
                    "system": true,
                    "type": "bool"
                },
                {
                    "hidden": false,
                    "id": "bool256245529",
                    "name": "verified",
                    "presentable": false,
                    "required": false,
                    "system": true,
                    "type": "bool"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE UNIQUE INDEX `idx_tokenKey_pbc_3142635823` ON `_superusers` (`tokenKey`)",
                "CREATE UNIQUE INDEX `idx_email_pbc_3142635823` ON `_superusers` (`email`) WHERE `email` != ''"
            ],
            "system": true,
            "authRule": "",
            "manageRule": null,
            "authAlert": {
                "enabled": true,
                "emailTemplate": {
                    "subject": "Login from a new location",
                    "body": "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
                }
            },
            "oauth2": {
                "mappedFields": {
                    "id": "",
                    "name": "",
                    "username": "",
                    "avatarURL": ""
                },
                "enabled": false
            },
            "passwordAuth": {
                "enabled": true,
                "identityFields": [
                    "email"
                ]
            },
            "mfa": {
                "enabled": false,
                "duration": 1800,
                "rule": ""
            },
            "otp": {
                "enabled": false,
                "duration": 180,
                "length": 8,
                "emailTemplate": {
                    "subject": "OTP for {APP_NAME}",
                    "body": "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
                }
            },
            "authToken": {
                "duration": 86400
            },
            "passwordResetToken": {
                "duration": 1800
            },
            "emailChangeToken": {
                "duration": 1800
            },
            "verificationToken": {
                "duration": 259200
            },
            "fileToken": {
                "duration": 180
            },
            "verificationTemplate": {
                "subject": "Verify your {APP_NAME} email",
                "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
            },
            "resetPasswordTemplate": {
                "subject": "Reset your {APP_NAME} password",
                "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
            },
            "confirmEmailChangeTemplate": {
                "subject": "Confirm your {APP_NAME} new email address",
                "body": "<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirm new email</a>\n</p>\n<p><i>If you didn't ask to change your email address, you can ignore this email.</i></p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
            }
        },
        {
            "id": "_pb_users_auth_",
            "listRule": "",
            "viewRule": "",
            "createRule": "",
            "updateRule": "id = @request.auth.id",
            "deleteRule": "id = @request.auth.id",
            "name": "users",
            "type": "auth",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "cost": 0,
                    "hidden": true,
                    "id": "password901924565",
                    "max": 0,
                    "min": 6,
                    "name": "password",
                    "pattern": "",
                    "presentable": false,
                    "required": true,
                    "system": true,
                    "type": "password"
                },
                {
                    "autogeneratePattern": "[a-zA-Z0-9]{50}",
                    "hidden": true,
                    "id": "text2504183744",
                    "max": 60,
                    "min": 30,
                    "name": "tokenKey",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "exceptDomains": null,
                    "hidden": false,
                    "id": "email3885137012",
                    "name": "email",
                    "onlyDomains": null,
                    "presentable": false,
                    "required": true,
                    "system": true,
                    "type": "email"
                },
                {
                    "hidden": false,
                    "id": "bool1547992806",
                    "name": "emailVisibility",
                    "presentable": false,
                    "required": false,
                    "system": true,
                    "type": "bool"
                },
                {
                    "hidden": false,
                    "id": "bool256245529",
                    "name": "verified",
                    "presentable": false,
                    "required": false,
                    "system": true,
                    "type": "bool"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1579384326",
                    "max": 255,
                    "min": 0,
                    "name": "name",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text2710109796",
                    "max": 0,
                    "min": 0,
                    "name": "nickname",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "file376926767",
                    "maxSelect": 1,
                    "maxSize": 0,
                    "mimeTypes": [
                        "image/jpeg",
                        "image/png",
                        "image/svg+xml",
                        "image/gif",
                        "image/webp"
                    ],
                    "name": "avatar",
                    "presentable": false,
                    "protected": false,
                    "required": false,
                    "system": false,
                    "thumbs": null,
                    "type": "file"
                },
                {
                    "hidden": false,
                    "id": "select3343321666",
                    "maxSelect": 1,
                    "name": "gender",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "select",
                    "values": [
                        "Male",
                        "Female",
                        "Other"
                    ]
                },
                {
                    "hidden": false,
                    "id": "date1191818290",
                    "max": "",
                    "min": "",
                    "name": "birthday",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "date"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text223244161",
                    "max": 0,
                    "min": 0,
                    "name": "address",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text3709889147",
                    "max": 500,
                    "min": 0,
                    "name": "bio",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1146066909",
                    "max": 20,
                    "min": 0,
                    "name": "phone",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "json3846545605",
                    "maxSize": 0,
                    "name": "settings",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "json"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": false,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": false,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE UNIQUE INDEX `idx_tokenKey__pb_users_auth_` ON `users` (`tokenKey`)",
                "CREATE UNIQUE INDEX `idx_email__pb_users_auth_` ON `users` (`email`) WHERE `email` != ''"
            ],
            "system": false,
            "authRule": "",
            "manageRule": null,
            "authAlert": {
                "enabled": true,
                "emailTemplate": {
                    "subject": "Login from a new location",
                    "body": "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
                }
            },
            "oauth2": {
                "mappedFields": {
                    "id": "",
                    "name": "name",
                    "username": "",
                    "avatarURL": "avatar"
                },
                "enabled": true
            },
            "passwordAuth": {
                "enabled": true,
                "identityFields": [
                    "email"
                ]
            },
            "mfa": {
                "enabled": false,
                "duration": 1800,
                "rule": ""
            },
            "otp": {
                "enabled": false,
                "duration": 180,
                "length": 8,
                "emailTemplate": {
                    "subject": "OTP for {APP_NAME}",
                    "body": "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
                }
            },
            "authToken": {
                "duration": 604800
            },
            "passwordResetToken": {
                "duration": 1800
            },
            "emailChangeToken": {
                "duration": 1800
            },
            "verificationToken": {
                "duration": 259200
            },
            "fileToken": {
                "duration": 180
            },
            "verificationTemplate": {
                "subject": "Verify your {APP_NAME} email",
                "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
            },
            "resetPasswordTemplate": {
                "subject": "Reset your {APP_NAME} password",
                "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
            },
            "confirmEmailChangeTemplate": {
                "subject": "Confirm your {APP_NAME} new email address",
                "body": "<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirm new email</a>\n</p>\n<p><i>If you didn't ask to change your email address, you can ignore this email.</i></p>\n<p>\n Thanks,<br/>\n {APP_NAME} team\n</p>"
            }
        },
        {
            "id": "pbc_4275539003",
            "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "createRule": null,
            "updateRule": null,
            "deleteRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "name": "_authOrigins",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text455797646",
                    "max": 0,
                    "min": 0,
                    "name": "collectionRef",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text127846527",
                    "max": 0,
                    "min": 0,
                    "name": "recordRef",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text4228609354",
                    "max": 0,
                    "min": 0,
                    "name": "fingerprint",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE UNIQUE INDEX `idx_authOrigins_unique_pairs` ON `_authOrigins` (collectionRef, recordRef, fingerprint)"
            ],
            "system": true
        },
        {
            "id": "pbc_2281828961",
            "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "createRule": null,
            "updateRule": null,
            "deleteRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "name": "_externalAuths",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text455797646",
                    "max": 0,
                    "min": 0,
                    "name": "collectionRef",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text127846527",
                    "max": 0,
                    "min": 0,
                    "name": "recordRef",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text2462348188",
                    "max": 0,
                    "min": 0,
                    "name": "provider",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1044722854",
                    "max": 0,
                    "min": 0,
                    "name": "providerId",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE UNIQUE INDEX `idx_externalAuths_record_provider` ON `_externalAuths` (collectionRef, recordRef, provider)",
                "CREATE UNIQUE INDEX `idx_externalAuths_collection_provider` ON `_externalAuths` (collectionRef, provider, providerId)"
            ],
            "system": true
        },
        {
            "id": "pbc_2279338944",
            "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "name": "_mfas",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text455797646",
                    "max": 0,
                    "min": 0,
                    "name": "collectionRef",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text127846527",
                    "max": 0,
                    "min": 0,
                    "name": "recordRef",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1582905952",
                    "max": 0,
                    "min": 0,
                    "name": "method",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_mfas_collectionRef_recordRef` ON `_mfas` (collectionRef,recordRef)"
            ],
            "system": true
        },
        {
            "id": "pbc_1638494021",
            "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
            "createRule": null,
            "updateRule": null,
            "deleteRule": null,
            "name": "_otps",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text455797646",
                    "max": 0,
                    "min": 0,
                    "name": "collectionRef",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text127846527",
                    "max": 0,
                    "min": 0,
                    "name": "recordRef",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "cost": 8,
                    "hidden": true,
                    "id": "password901924565",
                    "max": 0,
                    "min": 0,
                    "name": "password",
                    "pattern": "",
                    "presentable": false,
                    "required": true,
                    "system": true,
                    "type": "password"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": true,
                    "id": "text3866985172",
                    "max": 0,
                    "min": 0,
                    "name": "sentTo",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": true,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_otps_collectionRef_recordRef` ON `_otps` (collectionRef, recordRef)"
            ],
            "system": true
        },
        {
            "id": "pbc_comments_009",
            "listRule": "@request.auth.id != '' || (story_id != '' && story_id.privacy = 'public') || (journey_id != '' && journey_id.privacy = 'public')",
            "viewRule": "@request.auth.id != '' || (story_id != '' && story_id.privacy = 'public') || (journey_id != '' && journey_id.privacy = 'public')",
            "createRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "updateRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "deleteRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "name": "comments",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text2710109798",
                    "max": 1000,
                    "min": 1,
                    "name": "content",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": false,
                    "type": "text"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_stories_001",
                    "hidden": false,
                    "id": "relation1234567910",
                    "maxSelect": 1,
                    "minSelect": 0,
                    "name": "story_id",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_journeys_002",
                    "hidden": false,
                    "id": "relation1234567911",
                    "maxSelect": 1,
                    "minSelect": 0,
                    "name": "journey_id",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_comments_009",
                    "hidden": false,
                    "id": "relation1234567912",
                    "maxSelect": 1,
                    "minSelect": 0,
                    "name": "parent_comment_id",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567913",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "user_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": false,
                    "collectionId": "pbc_followers_006",
                    "hidden": false,
                    "id": "relation162268054",
                    "maxSelect": 1,
                    "minSelect": 0,
                    "name": "conversation_id",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "bool228880198",
                    "name": "is_read",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "bool"
                },
                {
                    "hidden": false,
                    "id": "file1204091606",
                    "maxSelect": 5,
                    "maxSize": 0,
                    "mimeTypes": [],
                    "name": "attachments",
                    "presentable": false,
                    "protected": false,
                    "required": false,
                    "system": false,
                    "thumbs": [],
                    "type": "file"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_comments_story_id` ON `comments` (`story_id`)",
                "CREATE INDEX `idx_comments_journey_id` ON `comments` (`journey_id`)",
                "CREATE INDEX `idx_comments_parent_comment_id` ON `comments` (`parent_comment_id`)",
                "CREATE INDEX `idx_comments_user_id` ON `comments` (`user_id`)",
                "CREATE INDEX `idx_comments_created` ON `comments` (`created`)"
            ],
            "system": false
        },
        {
            "id": "pbc_followers_006",
            "listRule": "",
            "viewRule": "",
            "createRule": "@request.auth.id != '' && follower_id = @request.auth.id && follower_id != following_id",
            "updateRule": "@request.auth.id != '' && following_id = @request.auth.id",
            "deleteRule": "@request.auth.id != '' && follower_id = @request.auth.id",
            "name": "followers",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567904",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "follower_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567905",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "following_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "select2063623452",
                    "maxSelect": 1,
                    "name": "status",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "select",
                    "values": [
                        "pending",
                        "accepted",
                        "none"
                    ]
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_followers_follower_id` ON `followers` (`follower_id`)",
                "CREATE INDEX `idx_followers_following_id` ON `followers` (`following_id`)",
                "CREATE UNIQUE INDEX `idx_followers_unique` ON `followers` (`follower_id`, `following_id`)"
            ],
            "system": false
        },
        {
            "id": "pbc_journey_likes_008",
            "listRule": "",
            "viewRule": "",
            "createRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "updateRule": "",
            "deleteRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "name": "journey_likes",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_journeys_002",
                    "hidden": false,
                    "id": "relation1234567908",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "journey_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567909",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "user_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_journey_likes_journey_id` ON `journey_likes` (`journey_id`)",
                "CREATE INDEX `idx_journey_likes_user_id` ON `journey_likes` (`user_id`)",
                "CREATE UNIQUE INDEX `idx_journey_likes_unique` ON `journey_likes` (`journey_id`, `user_id`)"
            ],
            "system": false
        },
        {
            "id": "pbc_journeys_002",
            "listRule": "privacy = 'public' || (@request.auth.id != '' && user_id = @request.auth.id)",
            "viewRule": "privacy = 'public' || (@request.auth.id != '' && user_id = @request.auth.id)",
            "createRule": "@request.auth.id != ''",
            "updateRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "deleteRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "name": "journeys",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1579384327",
                    "max": 200,
                    "min": 1,
                    "name": "title",
                    "pattern": "",
                    "presentable": true,
                    "primaryKey": false,
                    "required": true,
                    "system": false,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text2710109797",
                    "max": 5000,
                    "min": 0,
                    "name": "description",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "date1191818291",
                    "max": "",
                    "min": "",
                    "name": "start_date",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "date"
                },
                {
                    "hidden": false,
                    "id": "date1191818292",
                    "max": "",
                    "min": "",
                    "name": "end_date",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "date"
                },
                {
                    "hidden": false,
                    "id": "select3343321667",
                    "maxSelect": 1,
                    "name": "privacy",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "select",
                    "values": [
                        "public",
                        "friends",
                        "private"
                    ]
                },
                {
                    "hidden": false,
                    "id": "json3846545609",
                    "maxSize": 0,
                    "name": "timeline_items",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "json"
                },
                {
                    "hidden": false,
                    "id": "number1234567891",
                    "max": null,
                    "min": 0,
                    "name": "total_cost",
                    "onlyInt": false,
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "number"
                },
                {
                    "hidden": false,
                    "id": "select3343321668",
                    "maxSelect": 1,
                    "name": "currency",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "select",
                    "values": [
                        "VND",
                        "USD"
                    ]
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text223244164",
                    "max": 0,
                    "min": 0,
                    "name": "cover_image",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "bool256245530",
                    "name": "is_draft",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "bool"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567892",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "user_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_journeys_user_id` ON `journeys` (`user_id`)",
                "CREATE INDEX `idx_journeys_privacy` ON `journeys` (`privacy`)",
                "CREATE INDEX `idx_journeys_is_draft` ON `journeys` (`is_draft`)",
                "CREATE INDEX `idx_journeys_created` ON `journeys` (`created`)"
            ],
            "system": false
        },
        {
            "id": "pbc_locations_004",
            "listRule": "",
            "viewRule": "",
            "createRule": "@request.auth.id != ''",
            "updateRule": "@request.auth.id != ''",
            "deleteRule": "@request.auth.id != ''",
            "name": "locations",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1234567896",
                    "max": 200,
                    "min": 1,
                    "name": "name",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": false,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1234567897",
                    "max": 500,
                    "min": 0,
                    "name": "address",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "number1234567898",
                    "max": 90,
                    "min": -90,
                    "name": "latitude",
                    "onlyInt": false,
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "number"
                },
                {
                    "hidden": false,
                    "id": "number1234567899",
                    "max": 180,
                    "min": -180,
                    "name": "longitude",
                    "onlyInt": false,
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "number"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1234567900",
                    "max": 100,
                    "min": 0,
                    "name": "country",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1234567901",
                    "max": 100,
                    "min": 0,
                    "name": "city",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_locations_name` ON `locations` (`name`)",
                "CREATE INDEX `idx_locations_coordinates` ON `locations` (`latitude`, `longitude`)"
            ],
            "system": false
        },
        {
            "id": "pbc_media_files_003",
            "listRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "viewRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "createRule": "@request.auth.id != ''",
            "updateRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "deleteRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "name": "media_files",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "file376926768",
                    "maxSelect": 1,
                    "maxSize": 52428800,
                    "mimeTypes": [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/webp",
                        "video/mp4",
                        "video/webm",
                        "audio/mp3",
                        "audio/wav",
                        "audio/ogg"
                    ],
                    "name": "file",
                    "presentable": false,
                    "protected": false,
                    "required": true,
                    "system": false,
                    "thumbs": [
                        "100x100",
                        "300x300"
                    ],
                    "type": "file"
                },
                {
                    "hidden": false,
                    "id": "select3343321669",
                    "maxSelect": 1,
                    "name": "type",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "select",
                    "values": [
                        "image",
                        "video",
                        "audio"
                    ]
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text223244163",
                    "max": 0,
                    "min": 0,
                    "name": "url",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": false,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "number1234567893",
                    "max": null,
                    "min": 0,
                    "name": "size",
                    "onlyInt": true,
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "number"
                },
                {
                    "hidden": false,
                    "id": "number1234567894",
                    "max": null,
                    "min": 0,
                    "name": "duration",
                    "onlyInt": false,
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "number"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567895",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "user_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_media_files_user_id` ON `media_files` (`user_id`)",
                "CREATE INDEX `idx_media_files_type` ON `media_files` (`type`)"
            ],
            "system": false
        },
        {
            "id": "pbc_saves_011",
            "listRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "viewRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "createRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "updateRule": "",
            "deleteRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "name": "saves",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_stories_001",
                    "hidden": false,
                    "id": "relation1234567917",
                    "maxSelect": 1,
                    "minSelect": 0,
                    "name": "story_id",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_journeys_002",
                    "hidden": false,
                    "id": "relation1234567918",
                    "maxSelect": 1,
                    "minSelect": 0,
                    "name": "journey_id",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567919",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "user_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_saves_story_id` ON `saves` (`story_id`)",
                "CREATE INDEX `idx_saves_journey_id` ON `saves` (`journey_id`)",
                "CREATE INDEX `idx_saves_user_id` ON `saves` (`user_id`)",
                "CREATE UNIQUE INDEX `idx_saves_story_unique` ON `saves` (`story_id`, `user_id`) WHERE `story_id` IS NOT NULL",
                "CREATE UNIQUE INDEX `idx_saves_journey_unique` ON `saves` (`journey_id`, `user_id`) WHERE `journey_id` IS NOT NULL",
                "CREATE INDEX `idx_saves_created` ON `saves` (`created`)"
            ],
            "system": false
        },
        {
            "id": "pbc_shares_010",
            "listRule": "",
            "viewRule": "",
            "createRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "updateRule": "",
            "deleteRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "name": "shares",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_stories_001",
                    "hidden": false,
                    "id": "relation1234567914",
                    "maxSelect": 1,
                    "minSelect": 0,
                    "name": "story_id",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_journeys_002",
                    "hidden": false,
                    "id": "relation1234567915",
                    "maxSelect": 1,
                    "minSelect": 0,
                    "name": "journey_id",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567916",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "user_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_shares_story_id` ON `shares` (`story_id`)",
                "CREATE INDEX `idx_shares_journey_id` ON `shares` (`journey_id`)",
                "CREATE INDEX `idx_shares_user_id` ON `shares` (`user_id`)",
                "CREATE INDEX `idx_shares_created` ON `shares` (`created`)"
            ],
            "system": false
        },
        {
            "id": "pbc_stories_001",
            "listRule": "privacy = 'public' || (@request.auth.id != '' && user_id = @request.auth.id)",
            "viewRule": "privacy = 'public' || (@request.auth.id != '' && user_id = @request.auth.id)",
            "createRule": "@request.auth.id != ''",
            "updateRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "deleteRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "name": "stories",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1579384326",
                    "max": 200,
                    "min": 1,
                    "name": "title",
                    "pattern": "",
                    "presentable": true,
                    "primaryKey": false,
                    "required": true,
                    "system": false,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text2710109796",
                    "max": 10000,
                    "min": 1,
                    "name": "content",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "json3846545605",
                    "maxSize": 0,
                    "name": "media",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "json"
                },
                {
                    "hidden": false,
                    "id": "json3846545606",
                    "maxSize": 0,
                    "name": "audio_files",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "json"
                },
                {
                    "hidden": false,
                    "id": "json3846545607",
                    "maxSize": 0,
                    "name": "location",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "json"
                },
                {
                    "hidden": false,
                    "id": "json3846545608",
                    "maxSize": 0,
                    "name": "tags",
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "json"
                },
                {
                    "hidden": false,
                    "id": "select3343321666",
                    "maxSelect": 1,
                    "name": "privacy",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "select",
                    "values": [
                        "public",
                        "friends",
                        "private"
                    ]
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567890",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "user_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                },
                {
                    "hidden": false,
                    "id": "autodate3332085495",
                    "name": "updated",
                    "onCreate": true,
                    "onUpdate": true,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_stories_user_id` ON `stories` (`user_id`)",
                "CREATE INDEX `idx_stories_privacy` ON `stories` (`privacy`)",
                "CREATE INDEX `idx_stories_created` ON `stories` (`created`)"
            ],
            "system": false
        },
        {
            "id": "pbc_story_likes_007",
            "listRule": "",
            "viewRule": "",
            "createRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "updateRule": "",
            "deleteRule": "@request.auth.id != '' && user_id = @request.auth.id",
            "name": "story_likes",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "pbc_stories_001",
                    "hidden": false,
                    "id": "relation1234567906",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "story_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "cascadeDelete": true,
                    "collectionId": "_pb_users_auth_",
                    "hidden": false,
                    "id": "relation1234567907",
                    "maxSelect": 1,
                    "minSelect": 1,
                    "name": "user_id",
                    "presentable": false,
                    "required": true,
                    "system": false,
                    "type": "relation"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE INDEX `idx_story_likes_story_id` ON `story_likes` (`story_id`)",
                "CREATE INDEX `idx_story_likes_user_id` ON `story_likes` (`user_id`)",
                "CREATE UNIQUE INDEX `idx_story_likes_unique` ON `story_likes` (`story_id`, `user_id`)"
            ],
            "system": false
        },
        {
            "id": "pbc_tags_005",
            "listRule": "",
            "viewRule": "",
            "createRule": "@request.auth.id != ''",
            "updateRule": "@request.auth.id != ''",
            "deleteRule": "@request.auth.id != ''",
            "name": "tags",
            "type": "base",
            "fields": [
                {
                    "autogeneratePattern": "[a-z0-9]{15}",
                    "hidden": false,
                    "id": "text3208210256",
                    "max": 15,
                    "min": 15,
                    "name": "id",
                    "pattern": "^[a-z0-9]+$",
                    "presentable": false,
                    "primaryKey": true,
                    "required": true,
                    "system": true,
                    "type": "text"
                },
                {
                    "autogeneratePattern": "",
                    "hidden": false,
                    "id": "text1234567902",
                    "max": 50,
                    "min": 1,
                    "name": "name",
                    "pattern": "",
                    "presentable": false,
                    "primaryKey": false,
                    "required": true,
                    "system": false,
                    "type": "text"
                },
                {
                    "hidden": false,
                    "id": "number1234567903",
                    "max": null,
                    "min": 0,
                    "name": "usage_count",
                    "onlyInt": true,
                    "presentable": false,
                    "required": false,
                    "system": false,
                    "type": "number"
                },
                {
                    "hidden": false,
                    "id": "autodate2990389176",
                    "name": "created",
                    "onCreate": true,
                    "onUpdate": false,
                    "presentable": false,
                    "system": true,
                    "type": "autodate"
                }
            ],
            "indexes": [
                "CREATE UNIQUE INDEX `idx_tags_name_unique` ON `tags` (`name`)",
                "CREATE INDEX `idx_tags_usage_count` ON `tags` (`usage_count`)"
            ],
            "system": false
        }
    ]

    try {
        app.importCollections(collections, false)
        console.log("✅ Collections imported successfully")
    } catch (e) {
        console.error("Failed to import collections:", e)
        throw e
    }
}, (app) => {
    console.log("Rolling back imported collections...")
    const ids = [
        "pbc_3142635823",
        "_pb_users_auth_",
        "pbc_4275539003",
        "pbc_2281828961",
        "pbc_2279338944",
        "pbc_1638494021",
        "pbc_comments_009",
        "pbc_followers_006",
        "pbc_journey_likes_008",
        "pbc_journeys_002",
        "pbc_locations_004",
        "pbc_media_files_003",
        "pbc_saves_011",
        "pbc_shares_010",
        "pbc_stories_001",
        "pbc_story_likes_007",
        "pbc_tags_005",
    ]
    ids.forEach((cid) => {
        try {
            const c = app.findCollectionByNameOrId(cid)
            if (c) {
                app.delete(c)
            }
        } catch (e) {
            console.warn("Skip delete collection", cid, e?.message || e)
        }
    })
    console.log("✅ Collections rollback finished")
})


