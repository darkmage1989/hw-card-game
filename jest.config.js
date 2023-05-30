module.exports = async () => {
    return {
        verbose: true,
        preset: 'ts-jest',
        testEnvironment: 'jsdom',
        moduleNameMapper: {
            '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
        },
    };
};
