const expect = require('expect.js');
const orderBy = require('../src/server/core/orderBy');
const groupBy = require('../src/server/core/groupBy');
const parseFieldsOption = require('../src/server/core/parseFieldsOption');
const sqlFormatter = require('../src/server/core/sqlFormatter');

describe('core', function () {
    describe('#orderBy', function () {
        it('should return empty new array', function () {
            const arr = [];
            const result = orderBy(arr, {});
            expect(result).to.be.an(Array);
            expect(result).to.be.empty();
            expect(result).not.to.be.equal(arr);
        });

        it('should sort by `id` and order by default `asc`', function () {
            const arr = [
                { id: 3 },
                { id: 1 },
                { id: 2 }
            ];
            const result = orderBy(arr, { orderBy: 'id' });
            expect(result).to.eql([
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ]);
        });

        it('should sort by `id` and order by `desc`', function () {
            const arr = [
                { id: 3 },
                { id: 1 },
                { id: 2 }
            ];
            const result = orderBy(arr, { orderBy: 'id', orderDir: 'descs' });
            expect(result).to.be.an(Array);
            expect(result).to.not.be.empty();
            expect(result).not.to.be.equal(arr);
            expect(result).to.eql([
                { id: 3 },
                { id: 2 },
                { id: 1 }
            ]);
        });

        it('should sort by `id` and not change incoming param', function () {
            const arr = [
                { id: 3 },
                { id: 1 },
                { id: 2 }
            ];
            const result = orderBy(arr, { orderBy: 'id' });
            expect(result).to.be.an(Array);
            expect(result).to.not.be.empty();
            expect(result).not.to.be.equal(arr);
        });

        it('should may get nested props', function () {
            const arr = [
                { a: { id: 1 } },
                { a: { id: 3 } },
                { a: { id: 2 } }
            ];
            const result = orderBy(arr, { orderBy: 'a.id'});
            expect(result).to.eql([
                { a: { id: 1 } },
                { a: { id: 2 } },
                { a: { id: 3 } }
            ]);
        });
    });

    describe('#groupBy', function () {
        it('should grouped by `domain` and ordered by `count` asc', function () {
            const data = [
                { domain: 'a', score: 1 },
                { domain: 'a', score: 2 },
                { domain: 'c', score: 3 },
                { domain: 'b', score: 5 },
                { domain: 'b', score: 2 },
                { domain: 'a', score: 1 }
            ];
            const result = groupBy(data, { groupBy: 'domain', orderDir: 'desc' });

            expect(result).to.eql([
                { domain: 'a', count: 3, score: 4 },
                { domain: 'b', count: 2, score: 7 },
                { domain: 'c', count: 1, score: 3 }
            ]);
        });

        it('should grouped by `data.domain` and ordered by `count` asc', function () {
            const data = [
                { data: { domain: 'a', score: 1 } },
                { data: { domain: 'a', score: 2 } },
                { data: { domain: 'c', score: 3 } },
                { data: { domain: 'b', score: 5 } },
                { data: { domain: 'b', score: 2 } },
                { data: { domain: 'a', score: 1 } }
            ];
            const result = groupBy(data, { groupBy: 'data.domain', orderDir: 'desc' });

            expect(result).to.eql([
                { domain: 'a', count: 3, score: 4 },
                { domain: 'b', count: 2, score: 7 },
                { domain: 'c', count: 1, score: 3 }
            ]);
        });

        describe('#getParentPath', function () {
            it('should return parent `foo` path from `foo.bar`', function () {
                expect(groupBy.getParentPath('foo.bar')).to.eql('foo');
            });

            it('should return empty parent path from `bar`', function () {
                expect(groupBy.getParentPath('bar')).to.eql('');
            });
        });

        describe('#getFieldName', function () {
            it('should return `bar` path from `foo.bar`', function () {
                expect(groupBy.getFieldName('foo.bar')).to.eql('bar');
            });

            it('should return `bar` path from `bar`', function () {
                expect(groupBy.getFieldName('bar')).to.eql('bar');
            });
        });
    });

    describe('#sql formatter', function () {

        it('should return correct sql', function () {
            const data = [
                { id: 1, name: 'name 1'},
                { id: 2, name: 'name 2'},
                { id: 3, name: 'name 3'}
            ];
            const result = sqlFormatter(data, { tableName: 'foo', fields: 'id, name' });

            expect(result).to.eql(
                'INSERT INTO foo SET `id` = 1, `name` = \'name 1\';\r\n' +
                'INSERT INTO foo SET `id` = 2, `name` = \'name 2\';\r\n' +
                'INSERT INTO foo SET `id` = 3, `name` = \'name 3\';'
            );
        });

        it('should return correct sql with nested', function () {
            const data = [
                { data: { id: 1, name: 'name 1' }},
                { data: { id: 2, name: 'name 2' }},
                { data: { id: 3, name: 'name 3' }}
            ];
            const result = sqlFormatter(data, { tableName: 'foo', fields: 'data.id=id, data.name=name' });

            expect(result).to.eql(
                'INSERT INTO foo SET `id` = 1, `name` = \'name 1\';\r\n' +
                'INSERT INTO foo SET `id` = 2, `name` = \'name 2\';\r\n' +
                'INSERT INTO foo SET `id` = 3, `name` = \'name 3\';'
            );
        });
    });

    describe('#parseFieldsOption', function () {
        it('should parse `id,  name` to [["id", "id"], ["name", "name"]]', function () {
            const fieldsString = 'id,    name';
            const result = parseFieldsOption(fieldsString);
            expect(result).to.eql([
                ['id', 'id'],
                ['name', 'name']
            ])
        });

        it('should parse `data.id=id, data.name=name` to [["data.id", "id"], ["data.name", "name"]]', function () {
            const fieldsString = 'data.id=id, data.name=name';
            const result = parseFieldsOption(fieldsString);
            expect(result).to.eql([
                ['data.id', 'id'],
                ['data.name', 'name']
            ]);
        });
    });
});
