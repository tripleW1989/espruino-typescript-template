import { resolve as _resolve } from 'path';

export const entry = './src/index.ts';
export const module = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
    ]
};
export const resolve = {
    extensions: ['.tsx', '.ts', '.js']
};
export const externals = ['Wifi', 'http'];
export const output = {
    filename: 'bundle.js',
    // eslint-disable-next-line no-undef
    path: _resolve(__dirname, 'dist')
};
