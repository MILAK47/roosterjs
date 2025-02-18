import { ClipboardData } from 'roosterjs-editor-types';
import { GetSourceInputParams } from '../../../../../lib/editor/plugins/PastePlugin/pasteSourceValidations/getPasteSource';
import { shouldConvertToSingleImage } from '../../../../../lib/editor/plugins/PastePlugin/pasteSourceValidations/shouldConvertToSingleImage';

describe('shouldConvertToSingleImage |', () => {
    it('Is Single Image', () => {
        runTest(['IMG'], true, true /* shouldConvertToSingleImage */);
    });

    it('Is Single Image, feature is not enabled', () => {
        runTest(['IMG'], false, false /* shouldConvertToSingleImage */);
    });

    it('Is Not single Image, feature is not enabled', () => {
        runTest(['IMG', 'DIV'], false, false /* shouldConvertToSingleImage */);
    });

    it('Is Not single Image, feature is enabled', () => {
        runTest(['IMG', 'DIV'], false, true /* shouldConvertToSingleImage */);
    });

    function runTest(
        htmlFirstLevelChildTags: string[],
        resultExpected: boolean,
        shouldConvertToSingleImageInput: boolean
    ) {
        const fragment = document.createDocumentFragment();
        const clipboardData = <ClipboardData>{
            htmlFirstLevelChildTags,
        };

        const result = shouldConvertToSingleImage(<GetSourceInputParams>{
            fragment,
            shouldConvertSingleImage: shouldConvertToSingleImageInput,
            clipboardData,
        });

        expect(result).toEqual(resultExpected);
    }
});
