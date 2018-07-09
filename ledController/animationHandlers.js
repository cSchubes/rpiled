// animation handlers for the router

exports.rainbow = (req, res, next) => {
    console.log('Starting rainbow animations.');
    res.status(200).json({
        data: {
            message: 'Successfully started rainbow animation.'
        }
    });
}