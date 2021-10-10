// template: UU5Lsi
//@@viewOn:revision
// reviewed:
//@@viewOff:revision

const Lsi = {
  error: {
    cs: "Data se nepodařilo načíst",
    en: "Unable to load data.",
  },
  noData: {
    cs: "Žádné data k zobrazení.",
    en: "There is no data to be shown.",
  },
  errorInvalidProps: {
    cs: "Je nutné zadat buď 'baseUri' nebo 'uuBtBaseUri' spolu s 'artifactId' (nebo 'artifactCode').",
    en: "You have to specify either 'baseUri' or 'uuBtBaseUri' with 'artifactId' (or 'artifactCode').",
  },
  contextError: {
    cs: "Data se nepovedlo z kontextu načíst. Kontext pravděpodobně postrádá některé klíče.",
    en: "Unable to read from context. Context is probably missing some keys.",
  },
  forbidden: {
    cs:
      "Nemáte příslušná práva. Pokud si myslíte, že byste měli vidět obsah této komponenty, kontaktujte prosím příslušnou osobu.",
    en:
      "You are not authorized. If you think you should be able to see this component, please contact competent person.",
  },
};

//viewOn:exports
export default Lsi;
//viewOff:exports
