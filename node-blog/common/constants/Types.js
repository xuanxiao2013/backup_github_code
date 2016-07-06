
import Immutable from 'immutable';

// define ArticleState shape inside redux state
export const ArticleState = Immutable.Record({
	productsById: Immutable.Map(),
	total: '0',
})

export const ArticleRecord = Immutable.Record({
	id: null,
	image: "",
	inventory: 0,
	quantity: 0,
	price: 0,
	title: "",
	tid: null, // transaction id for optimistic update
})


export const ArticleListState = Immutable.Record({
	cartsById: Immutable.List()
})


export function convertToRecordMap( arr, Def ){
	return arr.reduce( (acc, item) => acc.set( item.id, new Def(item) ), Immutable.Map() );
}

export function convertMapToImmutable( map, Def ){
	return Object.keys(map)
				 .reduce( (acc, key) => {
				 	let item = map[key];
				 	return acc.set( item.id, new Def(item) );
				 }, Immutable.Map() );
}
