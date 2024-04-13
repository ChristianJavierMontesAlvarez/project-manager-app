export const isAuthWithTheProvider = ( providerName, listProviders ) => {
  for (const prov of listProviders) {
    if (prov.providerId.includes( providerName )) {
      return true
    }
  }
  return false;
}