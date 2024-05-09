

export interface category{
	id?:number;
	name:string;
}



export interface categoryResponse{
	categoria:category[]
}

export interface categoryUpdate{
	updateCategoriaDto:category
}