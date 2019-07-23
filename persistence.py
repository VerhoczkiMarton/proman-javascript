import database_handler

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def _get_data(data_type, force, board_id=None):
    """
    Reads defined type of data from file or cache
    :param data_type: key where the data is stored in cache, 'board' or 'card'
    :param force: if set to True, cache will be ignored
    :param board_id: Optional, use with 'card' data_type to specify board
    :return: OrderedDict
    """

    if force or data_type not in _cache:
        if data_type == 'board':
            _cache[data_type] = database_handler.get_boards()
        elif data_type == 'card':
            _cache[data_type] = database_handler.get_cards_for_board(board_id)
    return _cache[data_type]


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


def get_boards(force=False):
    return _get_data('board', force)


def get_cards_for_board(board_id, force=False):
    return _get_data('card', force, board_id)
