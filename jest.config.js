module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["./src"],
  
      // Jest transformations -- this adds support for TypeScript
      // using ts-jest
      transform: {
          "^.+\\.tsx?$": "ts-jest",
          "^.+\\.(js|ts|tsx)$": "ts-jest"
      },
      preset: 'ts-jest',
      coverageDirectory: 'coverage',
      collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
      // Runs special logic, such as cleaning up components
      // when using React Testing Library and adds special
      // extended assertions to Jest
      setupFilesAfterEnv: [
          "@testing-library/react/cleanup-after-each",
          "@testing-library/jest-dom/extend-expect"
      ],
      // Test spec file resolution pattern
      // Matches parent folder `__tests__` and filename
      // should contain `test` or `spec`.
      testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  
      // Module file extensions for importing
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      moduleNameMapper: {
          ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
          ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
              "<rootDir>/mocks/fileMock.js",
      },
      moduleDirectories: [
          "node_modules",
          "src"
      ],
      transformIgnorePatterns: [
          "node_modules/(?!lwc)"
        ]
  };
  // trying to change somethin