class Paginator {

	constructor(query, offset, limit) {
		this.offset = offset * 1 || 0;
		this.limit = limit * 1 || 20;
		this.query = query;
	}

	async paginate() {
		const collection = await this.query.skip(this.offset).limit(this.limit + 1);

		let response = {
			offset: this.offset,
			limit: this.limit,
			data: collection.slice(0, this.limit - this.offset),
		};

		response.has_more = response.data.length > collection.length;

		return response;
	}
}

module.exports = Paginator;