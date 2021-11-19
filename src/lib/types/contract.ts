export type Contract = {
    "version": "0.0.0",
    "name": "contract",
    "instructions": [
      {
        "name": "create",
        "accounts": [
          {
            "name": "baseAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "addGif",
        "accounts": [
          {
            "name": "baseAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          }
        ],
        "args": [
          {
            "name": "gifLink",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "BaseAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "totalGifs",
              "type": "u64"
            },
            {
              "name": "gifList",
              "type": {
                "vec": {
                  "defined": "ItemStruct"
                }
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "ItemStruct",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "gifLink",
              "type": "string"
            },
            {
              "name": "userAddress",
              "type": "publicKey"
            }
          ]
        }
      }
    ],
    "metadata": {
      "address": "7Q8FNVu7DHKpM7hK1hPytnqwMQL2aZcLbGFQ2LwbQ9De"
    }
  }