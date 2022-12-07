export const getPagination = (size,page) =>{
	const limit = size ? + size : 15;
	const offset = page ? page * limit : 0;
	return {limit, offset};
};