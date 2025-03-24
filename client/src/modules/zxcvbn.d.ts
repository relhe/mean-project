declare module 'zxcvbn' {
    interface ZXCVBNFeedback {
        warning: string;
        suggestions: string[];
    }

    interface ZXCVBNResult {
        score: number; // 0 (weak) to 4 (strong)
        feedback: ZXCVBNFeedback;
    }

    function zxcvbn(password: string): ZXCVBNResult;

    export = zxcvbn;
}
