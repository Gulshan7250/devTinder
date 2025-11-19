# DevTinder APIs

 authRouter
- POST /signup
- POST /Login
- POST /logout

 profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

 connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

- GET /connections
- GET /requests/received
- GET /feed - Gets you the profiles of other users on platforms

Status: ignore, interested, accepted, rejected