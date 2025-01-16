export const mockReceivedValises = {
    status: "OK",
    errorStatus: null,
    errorMessage: null,
    trace: null,
    data: {
      currentPage: 0,
      totalPages: 1,
      totalValises: 8,
      valises: [
        { id: 88, assumpte: "Valisa pendent de lectura", state: "RECEIVED" },
        { id: 175, assumpte: "Proba 2 Matthew", state: "RECEIVED" },
      ],
    },
  };

  export const mockEmptyValises = {
      status: "OK",
      errorStatus: null,
      errorMessage: null,
      trace: null,
      data: {
        currentPage: 0,
        totalPages: 0,
        totalValises: 0,
        valises: [],
      },
    };
  