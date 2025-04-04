export interface FileDetails {
    filename: string;
    documentUrl: string;
    colorMode: string;
    side: string;
    papersize: string;
    numberofcopies: number;
    numberofpages: number;
    price: number;
    status: string;
    _id: string;
  }

export interface Order {
    _id: string;
    useremail: string;
    files: FileDetails[];
    Token: string;
    TotalAmount: number;
    TotalSheets: number;
    __v: number;
  }

// export const mockOrders: Order[] = [
 
//   ];