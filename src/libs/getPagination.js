export const getPagination = (size,page) =>{
	const limit = size ? + size : 20;
	const offset = page ? page * limit : 0;
	return {limit, offset};
};