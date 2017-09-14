const expect = require('expect.js');
const makeNested = require('../src/task3/index');

describe('#test3', function () {
    it('should return nested', function () {
        const source = [
            { id: 1, parentId: 0 },
            { id: 2, parentId: 0 },
            { id: 3, parentId: 1 },
            { id: 4, parentId: 1 },
            { id: 5, parentId: 2 },
            { id: 6, parentId: 4 },
            { id: 7, parentId: 5 }
        ];

        const result = makeNested(source);

        expect(result).to.eql([
            {
                id: 1,
                parentId: 0,
                children: [
                    {
                        id: 3,
                        parentId: 1
                    },
                    {
                        id: 4,
                        parentId: 1,
                        children: [
                            {
                                id: 6,
                                parentId: 4
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                parentId: 0,
                children: [
                    {
                        id: 5,
                        parentId: 2,
                        children: [
                            {
                                id: 7,
                                parentId: 5
                            }
                        ]
                    }
                ]
            }
        ]);
    });

    it('should not modify source', function () {
        const source = [
            { id: 1, parentId: 0 },
            { id: 2, parentId: 1 }
        ];

        const result = makeNested(source);
        expect(result[0]).to.not.eql(source[0]);
    });
});
