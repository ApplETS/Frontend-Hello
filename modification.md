Dans le frontend [banche entraid-login], j'ai modifier le provider en ajoutant le user secret et en changant l'algoritme pour un hs256 au lieux de rs256 par default et j'enregistre le accessToken pour l'envoyer au backend' [nextauth/route.ts] 
L'URL de redirection dans authentik est https://localhost:8080/api/auth/callback/authentik.
