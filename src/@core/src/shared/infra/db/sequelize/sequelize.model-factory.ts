export class SequelizeModelFactory {

  constructor(private model: any, private factoryProps: () => any) {
  
  }

  async create(data?: any){
    return this.model.create(data ?? this.factoryProps())
  }

  make(){

  }

  async bulkCreate(){

  }

  bulkMake(){

  }
}
