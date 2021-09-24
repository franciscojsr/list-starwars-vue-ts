import http from "@/http";
import People from "@/types/people";

class HttpService {

  

  constructor(
    private path: string
    ){


      // console.log('this.path')
      // console.log(this.path)
      

  }

  getAllPeople(): Promise<any> {
    return http.get<any[]>("/"+this.path);
  }
  
  // getPath(){
  //   return this.path;
  // }
  // setPath(path: string) {
  //   this.path = path;
  // }

  getAll(): Promise<any> {
    return http.get<any>("/"+this.path);
  }

  get(id: any): Promise<any> {
    return http.get('/'+this.path+'/${id}');
  }

  create(data: any): Promise<any> {
    return http.post('/'+this.path, data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put('/'+this.path+'/${id}', data);
  }

  delete(id: any): Promise<any> {
    return http.delete('/'+this.path+'/${id}');
  }

  deleteAll(): Promise<any> {
    return http.delete('/'+this.path+'');
  }


}


export default HttpService;