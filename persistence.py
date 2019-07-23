import database_handler

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def _get_data(data_type, force, table):
    """
    Reads defined type of data from file or cache
    :param data_type: key where the data is stored in cache
    :param force: if set to True, cache will be ignored
    :return: OrderedDict
    """
    """
    legacy
    Call database_handler valami
    if force or data_type not in _cache:
        if table == 'board':
            _cache[data_type] = database_handler.get_boards()
        elif table == 'card':
            _cache[data_type] = database_handler.get_cards()
    return _cache[data_type]
    """
    pass


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


def get_boards(force=False):
    return """get_data valami"""


def get_cards_for_board(force=False):
    return """get_data valami"""
